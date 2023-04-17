import React, { useEffect, useState, useContext, useRef, createRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import web3 from '../connection/web3';
import ItemThumbnail from './item/ItemThumbnail';
import ItemInfoPanel from './item/ItemInfoPanel';
import ItemAuthor from './item/ItemAuthor';
import { formatPrice } from '../helpers/utils';
import Web3Context from '../store/web3-context';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import Loader from './general/Loader';
import FullScreenLoader from './general/FullScreenLoader';
import NFTCollection from '../contracts/NFTCollection.json';

function ItemSingle(props) {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    const web3Ctx = useContext(Web3Context);
    const [assetHistory, setAssetHistory] = useState([]);
    const { addToast } = useToasts();
    const [currentAsset, setCurrentAsset] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getAssetHistory() {
            const networkId = await web3Ctx.loadNetworkId(web3);
            const nftDeployedNetwork = NFTCollection.networks[networkId];
            const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);
            const itemHistory = await nftContract.methods.getTrack(id).call();
            setAssetHistory(itemHistory);
            console.log(itemHistory);
        }

        getAssetHistory();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const priceRefs = useRef([]);
    if (priceRefs.current.length !== collectionCtx.collection.length) {
        priceRefs.current = Array(collectionCtx.collection.length)
            .fill()
            .map((_, i) => priceRefs.current[i] || createRef());
    }

    const makeOfferHandler = (event, id, nftKey) => {
        event.preventDefault();

        const enteredPrice = web3.utils.toWei(priceRefs.current[nftKey].current.value, 'ether');

        collectionCtx.contract.methods
            .approve(marketplaceCtx.contract.options.address, id)
            .send({ from: web3Ctx.account })
            .on('transactionHash', (hash) => {
                marketplaceCtx.setMktIsLoading(true);
            })
            .on('receipt', (receipt) => {
                marketplaceCtx.contract.methods
                    .makeOffer(id, enteredPrice)
                    .send({ from: web3Ctx.account })
                    .on('error', (error) => {
                        addToast('Something went wrong when pushing to the blockchain', {
                            appearance: 'error',
                        });
                        marketplaceCtx.setMktIsLoading(false);
                    });
            });
    };

    const buyHandler = (event) => {
        const buyIndex = parseInt(event.target.value);
        marketplaceCtx.contract.methods
            .fillOffer(marketplaceCtx.offers[buyIndex].offerId)
            .send({ from: web3Ctx.account, value: marketplaceCtx.offers[buyIndex].price })
            .on('transactionHash', (hash) => {
                marketplaceCtx.setMktIsLoading(true);
            })
            .on('error', (error) => {
                addToast('Something went wrong when pushing to the blockchain', {
                    appearance: 'error',
                });
                marketplaceCtx.setMktIsLoading(false);
            });
    };

    const cancelHandler = (event) => {
        const cancelIndex = parseInt(event.target.value);
        marketplaceCtx.contract.methods
            .cancelOffer(marketplaceCtx.offers[cancelIndex].offerId)
            .send({ from: web3Ctx.account })
            .on('transactionHash', (hash) => {
                marketplaceCtx.setMktIsLoading(true);
            })
            .on('error', (error) => {
                addToast('Something went wrong when pushing to the blockchain', {
                    appearance: 'error',
                });
                marketplaceCtx.setMktIsLoading(false);
            });
    };

    useEffect(() => {
        document.title = 'Item Details | NFT Marketplace';
    }, []);

    useEffect(() => {
        setCurrentAsset(collectionCtx.collection.filter((asset) => asset.id === parseInt(id)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collectionCtx.collection]);

    return (
        <>
            {marketplaceCtx.mktIsLoading ? <FullScreenLoader heading='loading' /> : null}
            <section className='py-5 mt-2'>
                {collectionCtx.collection.length === 0 ? (
                    <div className='py-5 text-center mt-5'>
                        <h1 className='h2 mt-5'>Fetching item details</h1>
                        <p className='text-muted'>Please wait until we prepare your data.</p>
                        <Loader />
                    </div>
                ) : (
                    currentAsset.map((asset, key) => {
                        const index = marketplaceCtx.offers
                            ? marketplaceCtx.offers.findIndex((offer) => offer.id === asset.id)
                            : -1;
                        const owner = index === -1 ? asset.owner : marketplaceCtx.offers[index].user;
                        const price = index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                        return (
                            <div key={key}>
                                <div className='bg-dark py-4 mt-4'>
                                    <div className='container'>
                                        <nav aria-label='breadcrumb'>
                                            <ol className='breadcrumb'>
                                                <li className='breadcrumb-item'>
                                                    <Link
                                                        className='text-decoration-none d-flex align-items-center'
                                                        to='/'
                                                    >
                                                        {' '}
                                                        <i className='las la-home la-sm me-1'></i>Home
                                                    </Link>
                                                </li>
                                                <li className='breadcrumb-item'>
                                                    <Link
                                                        className='text-decoration-none d-flex align-items-center'
                                                        to='/explore'
                                                    >
                                                        {' '}
                                                        <i className='las la-icons la-sm me-1'></i>Explore
                                                    </Link>
                                                </li>
                                                <li className='breadcrumb-item active' aria-current='page'>
                                                    {asset.title}
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                                <div className='container py-5'>
                                    <div className='row mb-4 gy-4 mt-4'>
                                        <div className='col-lg-6'>
                                            <ItemThumbnail thumbnail={`https://ipfs.io/ipfs/${asset.img}`} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <ItemInfoPanel
                                                name={asset.title}
                                                category={asset.category}
                                                img={`https://ipfs.io/ipfs/${asset.img}`}
                                                creator={assetHistory[0]}
                                                description={asset.description}
                                                dateCreated={asset.dateCreated}
                                            />

                                            <ItemAuthor creator={assetHistory[0]} owner={owner} />

                                            <div className='gy-4 my-4'>
                                                <h6 className='mb-3'>Price</h6>
                                                {price ? (
                                                    <div className='text-sm text-muted fw-normal mb-0 d-flex align-items-center'>
                                                        <span className='icon bg-primary text-white me-2'>
                                                            <i className='lab la-ethereum fa-fw'></i>
                                                        </span>
                                                        <p className='mb-0 h4 d-flex align-items-end fw-normal text-white ms-2'>
                                                            {price} <span className='ms-2 text-muted small'>ETH</span>
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className='text-muted mb-0'>This item is not for sale!</p>
                                                )}
                                            </div>

                                            {index !== -1 ? (
                                                owner !== web3Ctx.account ? (
                                                    <button
                                                        type='button'
                                                        className='btn btn-gradient-primary px-5'
                                                        value={index}
                                                        onClick={buyHandler}
                                                    >
                                                        Buy Item
                                                    </button>
                                                ) : (
                                                    <button
                                                        type='button'
                                                        value={index}
                                                        className='btn btn-danger px-5'
                                                        onClick={cancelHandler}
                                                    >
                                                        Cancel Offer
                                                    </button>
                                                )
                                            ) : owner === web3Ctx.account ? (
                                                <div className='col-xl-8'>
                                                    <form
                                                        className='input-group'
                                                        onSubmit={(e) => makeOfferHandler(e, asset.id, key)}
                                                    >
                                                        <button
                                                            type='submit'
                                                            className='btn btn-primary rounded-sm me-2'
                                                        >
                                                            Offer
                                                        </button>
                                                        <input
                                                            type='number'
                                                            step='0.001'
                                                            min='0.0000000000000000000000001'
                                                            placeholder='ETH...'
                                                            className='form-control py-1 rounded-sm bg-dark'
                                                            ref={priceRefs.current[key]}
                                                        />
                                                    </form>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </>
    );
}

export default ItemSingle;

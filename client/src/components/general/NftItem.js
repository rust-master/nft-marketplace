import React, { useContext, useRef, createRef } from 'react';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import web3 from '../../connection/web3';
import Web3Context from '../../store/web3-context';
import CollectionContext from '../../store/collection-context';
import MarketplaceContext from '../../store/marketplace-context';
import { motion } from 'framer-motion/dist/es/index';
import { formatDate } from '../../helpers/utils';
import NftCategory from './NftCategory';

function NftItem({ img, title, owner, price, category, dateCreated, id, index, nftKey }) {
    console.log("img", img)
    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    const { addToast } = useToasts();

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

    return (
        <motion.div
            className={`card rounded shadow-sm card-hover-image ${category}`}
            initial={{ y: -8, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: nftKey / 3, duration: 0.3 }}
        >
            <div className='card-body p-3 position-relative'>
                <div className='position-relative mb-4 shadow'>
                    <div className='author z-index-20'>
                        <div className='ms-3 rounded-circle bd-3 border-dark' style={{ width: '45px', height: '45px' }}>
                            <Jazzicon address={owner} />
                        </div>
                        <span className='icon bg-primary text-white me-1'>
                            <i className='las la-check-double'></i>
                        </span>
                    </div>
                    <div className='card-img-holder rounded overflow-hidden'>
                        <Link className='text-reset' to={`/assets/${id}`}>
                            <img
                                className='img-fluid rounded w-100'
                                src={`https://ipfs.io/ipfs/${img}`}
                                alt={title}
                            />
                        </Link>
                    </div>
                </div>
                <p className='fw-bold mb-3'>
                    <Link className='text-reset' to={`/assets/${id}`}>
                        {title}
                    </Link>
                </p>
                {index !== -1 ? (
                    owner !== web3Ctx.account ? (
                        <>
                            <p className='text-sm text-muted fw-normal mb-2 d-flex align-items-center'>
                                <span className='icon bg-primary text-white me-2'>
                                    <i className='lab la-ethereum fa-fw'></i>
                                </span>
                                <span>Price: </span>
                                <span className='text-primary ms-2'>{price}</span>
                                <span className='ms-2'>ETH</span>
                            </p>
                            <NftCategory category={category} />
                            <button type='button' className='btn btn-primary w-100' value={index} onClick={buyHandler}>
                                Buy Item
                            </button>
                        </>
                    ) : (
                        <>
                            <p className='text-sm text-muted fw-normal mb-2 d-flex align-items-center'>
                                <span className='icon bg-primary text-white me-2'>
                                    <i className='lab la-ethereum fa-fw'></i>
                                </span>
                                <span>Price: </span>
                                <span className='text-primary ms-2'>{price}</span>
                                <span className='ms-2'>ETH</span>
                            </p>
                            <NftCategory category={category} />
                            <button
                                type='button'
                                value={index}
                                className='btn btn-danger w-100'
                                onClick={cancelHandler}
                            >
                                Cancel
                            </button>
                        </>
                    )
                ) : owner === web3Ctx.account ? (
                    <>
                        <NftCategory category={category} />
                        <p className='text-muted mb-2'>This is your item, you can put it on sale</p>
                        <form className='input-group' onSubmit={(e) => makeOfferHandler(e, id, nftKey)}>
                            <button type='submit' className='btn btn-primary rounded-sm me-2'>
                                Offer
                            </button>
                            <input
                                type='number'
                                step='0.001'
                                min='0.0000000000000000000000001'
                                placeholder='ETH...'
                                className='form-control py-1 rounded-sm'
                                ref={priceRefs.current[nftKey]}
                            />
                        </form>
                    </>
                ) : (
                    <>
                        <NftCategory category={category} />
                        <div className='bg-body p-3 rounded-sm text-muted text-cente mt-3 mb-4'>
                            <span className='text-sm'>Item owner hasn't put an offer yet</span>
                        </div>
                    </>
                )}

                <div className='my-3 pt-1 bg-body rounded-pill'></div>
                <p className='text-muted fw-normal mb-0 text-sm d-flex align-items-center'>
                    <i className='la-sm text-primary las la-clock mx-1 mt-1 text-primary'></i>
                    Created
                    <span className='text-primary mx-2'>{formatDate(dateCreated)}</span> ago
                </p>
            </div>
        </motion.div>
    );
}

export default NftItem;

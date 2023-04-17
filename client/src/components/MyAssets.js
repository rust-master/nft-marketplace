import React, { useEffect, useContext, useState } from 'react';
import 'swiper/swiper-bundle.css';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import { formatPrice } from '../helpers/utils';
import Web3Context from '../store/web3-context';
import FullScreenLoader from './general/FullScreenLoader';
import NoDataAlert from './general/NoDataAlert';

// COMPONENTS
import NftItem from './general/NftItem';
import PageBanner from './general/PageBanner';

function MyAssets() {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    const web3Ctx = useContext(Web3Context);
    const [currentAddress, setCurrentAddress] = useState();

    useEffect(() => {
        document.title = 'MITT | React NFT Marketplace';
        setCurrentAddress(web3Ctx.account);
    }, [web3Ctx.account]);

    // RETURN ITEMS TEMPLATE
    return (
        <>
            {marketplaceCtx.mktIsLoading ? <FullScreenLoader heading='loading' /> : null}
            <PageBanner heading={'My Assets'} />

            {/* NFT ITEMS */}
            <section className='py-5'>
                <div className='container'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>Your available NFTs</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    <div className='row gy-4'>
                        {collectionCtx.collection
                            .filter((item) => item.owner === currentAddress)
                            .map((NFT, key) => {
                                const index = marketplaceCtx.offers
                                    ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                    : -1;
                                const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                const price =
                                    index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                                return (
                                    <div className={`col-xl-3 col-lg-4 col-md-6 mix`} key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </div>
                                );
                            })}

                        {collectionCtx.collection.filter((item) => item.owner === currentAddress).length === 0 ? (
                            <div className='col-9'>
                                <NoDataAlert
                                    heading="You don't have any assets that lays under your ownership, if you put assets for
                                        sale you might see them at the section below."
                                    subheading='Please note that when you put item for sale the ownership goes to
                                        marketplace and the marketplace will sell it for you.'
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* NFT ITEMS */}
            <section className='py-5'>
                <div className='container pb-5'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>Placed for sale NFTs</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    {marketplaceCtx.offers.length === 0 && !marketplaceCtx.loading ? (
                        <div className='col-9'>
                            <NoDataAlert
                                heading="There're no Open For Sale assets at the moment."
                                subheading='Once someone has listed his asset for sale, you should find it here.'
                            />
                        </div>
                    ) : null}

                    <div className='row gy-4'>
                        {collectionCtx.collection
                            .filter((item) => item.owner === marketplaceCtx.contract.options.address)
                            .map((NFT, key) => {
                                const index = marketplaceCtx.offers
                                    ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                    : -1;
                                const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                const price =
                                    index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                                return (
                                    <div className={`col-xl-3 col-lg-4 col-md-6 mix`} key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyAssets;

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { formatPrice } from '../helpers/utils';
import { categoryOptions } from '../helpers/constants';
import 'swiper/swiper-bundle.css';

// COMPONENTS
import HomeBanner from './home/HomeBanner';
import NftItem from './general/NftItem';
import NoDataAlert from './general/NoDataAlert';
import TopSellers from './home/TopSellers';
import Loader from './general/Loader';

SwiperCore.use([Navigation]);

function Home({ topSellers }) {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);

    useEffect(() => {
        document.title = 'MITT | React NFT Marketplace';
    });

    // RETURN ITEMS TEMPLATE
    return (
        <>
            <HomeBanner />

            {/* MARKETPLACE FEATURED ITEMS */}
            <section className='py-5'>
                <div className='container py-5'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>Marketplace's Choice</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    {collectionCtx.totalSupply === 0 && !collectionCtx.nftIsLoading ? (
                        <div className='col-9'>
                            <NoDataAlert
                                heading="There're no NFTs at the moment."
                                subheading='Try to mint some assets to see how are we rendering them.'
                            />
                        </div>
                    ) : null}

                    {collectionCtx.collection.length === 0 && collectionCtx.totalSupply !== 0 ? <Loader /> : null}

                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            400: { slidesPerView: 1 },
                            900: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                            1400: { slidesPerView: 4 },
                        }}
                        navigation={Boolean(collectionCtx.collection.length !== 0)}
                    >
                        {collectionCtx.collection
                            .slice(Math.max(collectionCtx.collection.length - 4, 1))
                            .map((NFT, key) => {
                                const index = marketplaceCtx.offers
                                    ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                    : -1;
                                const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                const price =
                                    index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                                return (
                                    <SwiperSlide key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </section>

            {/* BROWSE BY CATEGORY */}
            <section className='py-5 bg-dark'>
                <div className='container py-4'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>Browse by category</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    <div className='row gy-4'>
                        {categoryOptions.map((el, i) => {
                            return (
                                <div className='col-xl-2 col-lg-4 col-6' key={i}>
                                    <div className='card card-hover-minimal bg-body htw-card'>
                                        <div className='card-body text-center'>
                                            <i
                                                className={`text-primary mb-2 ${el.icon}`}
                                                style={{ fontSize: '2rem' }}
                                            ></i>
                                            <Link className='text-reset stretched-link' to={`/categories/${el.value}`}>
                                                <h6 className='fw-normal'>{el.label}</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* NFT ITEMS */}
            <section className='py-5'>
                <div className='container pt-5'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>New Items</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    {collectionCtx.totalSupply === 0 && !collectionCtx.nftIsLoading ? (
                        <div className='col-9'>
                            <NoDataAlert
                                heading="There're no NFTs at the moment."
                                subheading='Try to mint some assets to see how are we rendering them.'
                            />
                        </div>
                    ) : null}

                    {collectionCtx.collection.length === 0 && collectionCtx.totalSupply !== 0 ? <Loader /> : null}

                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            400: { slidesPerView: 1 },
                            900: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                            1400: { slidesPerView: 4 },
                        }}
                        navigation={Boolean(collectionCtx.collection.length !== 0)}
                    >
                        {collectionCtx.collection.slice(0, 8).map((NFT, key) => {
                            const index = marketplaceCtx.offers
                                ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                : -1;
                            const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                            const price =
                                index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                            return (
                                <SwiperSlide key={key}>
                                    <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>

            <TopSellers
                topSellers={topSellers}
                title='Top Sellers'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis sed,necessitatibus nostrum mollitia.'
            />

            <section className='py-5 bg-dark'>
                <div className='container py-5'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6 text-center mx-auto'>
                                <h2>How it works</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    <div className='row gy-4'>
                        <div className='col-lg-4'>
                            <div className='card card-hover-minimal shadow bg-body htw-card'>
                                <div className='card-body p-lg-5 d-flex align-items-center'>
                                    <div className='icon-animated mx-auto flex-shrink-0'>
                                        <i className='las la-wallet'></i>
                                    </div>
                                    <div className='ms-3'>
                                        <h5>Connect your wallet</h5>
                                        <p className='text-muted text-sm mb-0'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam,
                                            maxi ut accumsan ut
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-4'>
                            <div className='card card-hover-minimal shadow bg-body htw-card'>
                                <div className='card-body p-lg-5 d-flex align-items-center'>
                                    <div className='icon-animated mx-auto flex-shrink-0'>
                                        <i className='las la-rocket'></i>
                                    </div>
                                    <div className='ms-3'>
                                        <h5>Mint & Buy and Sell NFTs</h5>
                                        <p className='text-muted text-sm mb-0'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam,
                                            maxi ut accumsan ut
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-4'>
                            <div className='card card-hover-minimal shadow bg-body htw-card'>
                                <div className='card-body p-lg-5 d-flex align-items-center'>
                                    <div className='icon-animated mx-auto flex-shrink-0'>
                                        <i className='lab la-ethereum'></i>
                                    </div>
                                    <div className='ms-3'>
                                        <h5>Collect your funds</h5>
                                        <p className='text-muted text-sm mb-0'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque quam,
                                            maxi ut accumsan ut
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NFT ITEMS */}
            <section className='py-5'>
                <div className='container py-5'>
                    <header className='mb-5'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <h2>Open for sale NFTs</h2>
                                <p className='text-muted text-sm mb-0'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                    sed,necessitatibus nostrum mollitia.
                                </p>
                            </div>
                        </div>
                    </header>

                    {marketplaceCtx.offers.length === 0 && !marketplaceCtx.mktIsLoading ? (
                        <div className='col-9'>
                            <NoDataAlert
                                heading="There're no Open For Sale assets at the moment."
                                subheading='Once someone has listed his asset for sale, you should find it here.'
                            />
                        </div>
                    ) : null}

                    {marketplaceCtx.mktIsLoading ? <Loader /> : null}

                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            400: { slidesPerView: 1 },
                            900: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                            1400: { slidesPerView: 4 },
                        }}
                        navigation={Boolean(marketplaceCtx.offers.length !== 0)}
                    >
                        {collectionCtx.collection.map((NFT, key) => {
                            const index = marketplaceCtx.offers
                                ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                : -1;
                            const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                            const price =
                                index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                            return (
                                index !== -1 && (
                                    <SwiperSlide key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </SwiperSlide>
                                )
                            );
                        })}
                    </Swiper>
                </div>
            </section>
        </>
    );
}

export default Home;

import React, { useEffect, useContext, useState } from 'react';
import PageBanner from './general/PageBanner';
// import Pagination from './general/Pagination';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import { formatPrice } from '../helpers/utils';
import NftItem from './general/NftItem';
import Loader from './general/Loader';
import mixitup from 'mixitup';
import FullScreenLoader from './general/FullScreenLoader';
import { categoryOptions } from '../helpers/constants';

function Explore() {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    // const [currentPage, setCurrentPage] = useState(1);
    const [currentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = collectionCtx.collection.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        document.title = 'Explore NFTs | NFT Marketplace';
        if (document.querySelector('.mixitUpContainer')) {
            mixitup('.mixitUpContainer');
        }
        return () => console.log('clear...');
    }, []);

    // Pagination
    // function paginate(pageNumber) {
    //     setCurrentPage(pageNumber);
    // }

    return (
        <>
            {marketplaceCtx.mktIsLoading ? <FullScreenLoader heading='loading' /> : null}
            <PageBanner heading={'Explore our NFTs'} />
            <section className='py-5'>
                {/* FILTER CONTROLS */}
                <div className='container pt-5'>
                    <div className='controls d-flex flex-column flex-md-row mb-4 p-1 bg-dark bd-3 rounded'>
                        <button className='mixitup-control flex-fill m-1' type='button' data-filter='all'>
                            All
                        </button>
                        {categoryOptions.map((el, i) => {
                            return (
                                <button
                                    key={i}
                                    className='mixitup-control flex-fill m-1'
                                    type='button'
                                    data-filter={`.${el.value}`}
                                >
                                    {el.label}
                                </button>
                            );
                        })}
                    </div>

                    {collectionCtx.collection.length !== 0 && collectionCtx.totalSupply !== 0 ? (
                        <div className='row mixitUpContainer gy-4 mb-5 align-items-stretch'>
                            {currentItems.map((NFT, key) => {
                                const index = marketplaceCtx.offers
                                    ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                    : -1;
                                const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                const price =
                                    index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                                return (
                                    <div className={`col-xl-3 col-lg-4 col-md-6 mix ${NFT.category}`} key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <h6 className='fw-normal text-muted text-center mb-0'>
                                Fetching data from the blockchain please wait...
                            </h6>
                            <Loader />
                        </>
                    )}

                    {/* <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={collectionCtx.collection.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    /> */}
                </div>
            </section>
        </>
    );
}

export default Explore;

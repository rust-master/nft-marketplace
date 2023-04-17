import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageBanner from './general/PageBanner';
// import Pagination from './general/Pagination';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import { formatPrice, formatCategory } from '../helpers/utils';
import NftItem from './general/NftItem';
import Loader from './general/Loader';
import FullScreenLoader from './general/FullScreenLoader';

function Category() {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    // const [currentPage, setCurrentPage] = useState(1);
    const [currentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const { category } = useParams();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = collectionCtx.collection.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        document.title = `${formatCategory(category)} | NFT Marketplace`;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(category);

    // Pagination
    // function paginate(pageNumber) {
    //     setCurrentPage(pageNumber);
    // }

    return (
        <>
            {marketplaceCtx.mktIsLoading ? <FullScreenLoader heading='loading' /> : null}
            <PageBanner heading={`${formatCategory(category)} NFTs`} />
            <section className='py-5'>
                <div className='container py-5'>
                    {collectionCtx.collection.length !== 0 && collectionCtx.totalSupply !== 0 ? (
                        <div className='row mixitUpContainer gy-4 mb-5 align-items-stretch'>
                            {currentItems
                                .filter((el) => el.category === category)
                                .map((NFT, key) => {
                                    const index = marketplaceCtx.offers
                                        ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                        : -1;
                                    const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                    const price =
                                        index !== -1
                                            ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2)
                                            : null;

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

                    {currentItems.filter((el) => el.category === category).length === 0 &&
                        collectionCtx.collection.length !== 0 &&
                        collectionCtx.totalSupply !== 0 && (
                            <div className='row text-center'>
                                <div className='col-lg-6 mx-auto'>
                                    <i className='las la-exclamation mb-2' style={{ fontSize: '3rem' }}></i>
                                    <h3 className='h3'>No NFTs listed under this category.</h3>
                                    <p className='text-muted mb-3'>Return Home and pick another category...</p>
                                    <Link className='btn btn-gradient-primary' to='/'>
                                        Return Home
                                    </Link>
                                </div>
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}

export default Category;

import React, { useEffect, useContext, useState } from 'react';
import CollectionContext from '../store/collection-context';
import { Link } from 'react-router-dom';
import MarketplaceContext from '../store/marketplace-context';
import { formatPrice } from '../helpers/utils';
import NftItem from './general/NftItem';
// import Particles from 'react-tsparticles';
import { particlesOptions } from '../helpers/constants';
import FullScreenLoader from './general/FullScreenLoader';

function Search() {
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    const [query, setQuery] = useState('');
    const [searchResultsLength, setSearchResultsLength] = useState(0);

    useEffect(() => {
        document.title = 'Search Assets';
    }, []);

    useEffect(() => {
        setSearchResultsLength(
            collectionCtx.collection.filter((nft) => {
                if (nft.title.toLowerCase().includes(query.toLowerCase().trim())) {
                    return nft;
                }
                return false;
            }).length
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <>
            {collectionCtx.collection.length === 0 ? <FullScreenLoader /> : null}
            <section className='py-5 bg-dark position-relative'>
                {/* <Particles params={particlesOptions} /> */}
                <div className='container py-5 mt-5 z-index-20'>
                    <div className='row mb-5'>
                        <div className='col-lg-6 text-center mx-auto'>
                            <h1>Search digital assets</h1>
                            <p className='text-muted mb-0'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae esse quis
                                sed,necessitatibus nostrum mollitia.
                            </p>
                        </div>
                    </div>

                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-center'>
                            <li className='breadcrumb-item'>
                                <Link className='text-decoration-none d-flex align-items-center' to='/'>
                                    {' '}
                                    <i className='las la-home la-sm me-1'></i>Home
                                </Link>
                            </li>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Search digital assets
                            </li>
                        </ol>
                    </nav>

                    <div className='search-form-holder'>
                        <div className='row'>
                            <div className='col-lg-8 mx-auto'>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div
                                        className='bg-dark rounded p-1 shadow-sm'
                                        style={{ border: '5px solid #1c212d' }}
                                    >
                                        <div className='input-icon'>
                                            <div className='input-icon-text' style={{ top: '1.1rem' }}>
                                                <i className='text-primary las la-search'></i>
                                            </div>
                                            <input
                                                className='form-control bg-none form-control-lg shadow-0 py-3 border-0'
                                                type='search'
                                                autoComplete='off'
                                                name='search'
                                                placeholder='Search....'
                                                onChange={(event) => setQuery(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-5 mt-4'>
                {query !== '' && searchResultsLength > 0 ? (
                    <p className='lead text-muted text-center mb-0'>
                        Found <strong className='fw-bold badge bg-primary mx-2'>{searchResultsLength}</strong> items
                        match your search
                    </p>
                ) : null}
                <div className='container py-5'>
                    <div className='row gy-4'>
                        {collectionCtx.collection
                            .filter((nft) => {
                                if (query === '') {
                                    return false;
                                } else if (nft.title.toLowerCase().includes(query.toLowerCase().trim())) {
                                    return nft;
                                }
                                return false;
                            })
                            .map((NFT, key) => {
                                const index = marketplaceCtx.offers
                                    ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
                                    : -1;
                                const owner = index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
                                const price =
                                    index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;

                                return (
                                    <div className={`col-xl-3 col-lg-4 col-md-6 ${NFT.category}`} key={key}>
                                        <NftItem {...NFT} index={index} owner={owner} price={price} nftKey={key} />
                                    </div>
                                );
                            })}
                    </div>

                    {query.trim() === '' ? (
                        <div className='row text-center'>
                            <div className='col-lg-6 mx-auto'>
                                <i className='las la-keyboard mb-2' style={{ fontSize: '2.5rem' }}></i>
                                <h3 className='h3'>No search data entered!</h3>
                                <p className='text-muted mb-0'>Wating for your search...</p>
                            </div>
                        </div>
                    ) : null}

                    {query.trim() !== '' && searchResultsLength === 0 ? (
                        <div className='row text-center'>
                            <div className='col-lg-6 mx-auto'>
                                <i className='las la-exclamation mb-2' style={{ fontSize: '3rem' }}></i>
                                <h3 className='h3'>Cannot find any assets that match your search</h3>
                                <p className='text-muted mb-0'>You can search for another term...</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
}

export default Search;

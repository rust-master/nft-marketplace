import React, { useEffect, useContext, useState } from 'react';
import PageBanner from './general/PageBanner';
import Pagination from './general/Pagination';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import Web3Context from '../store/web3-context';
import MarketplaceContext from '../store/marketplace-context';
import { formatPrice, configEtherScanUrl } from '../helpers/utils';
import FullScreenLoader from './general/FullScreenLoader';

function Authors({ sellers }) {
    const web3Ctx = useContext(Web3Context);
    const marketplaceCtx = useContext(MarketplaceContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuthors = sellers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        document.title = 'All Authors | NFT Marketplace';
    }, []);

    // Pagination
    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    // Create top sellers template
    const renderSellers = currentAuthors
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .map((seller, index) => {
            return (
                <div className='col-xl-3 col-lg-4 col-md-6' key={index}>
                    <div className='card bd-3 card-hover-minimal position-relative'>
                        <div className='card-body'>
                            <a
                                className='d-flex align-items-center text-reset text-decoration-none stretched-link'
                                href={configEtherScanUrl(web3Ctx.networkId, seller.address)}
                                rel='noreferrer noopener'
                                target='_blank'
                            >
                                <p className='fw-bold text-primary mb-0'>1.</p>
                                <div className='position-relative'>
                                    <div className='ms-3' style={{ width: '50px', height: '50px' }}>
                                        <Jazzicon address={seller.address} />
                                    </div>
                                    <div className='author-img-badge bg-primary text-white'>
                                        <i className='las la-check-double la-xs'></i>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <h3 className='h6 mb-1 text-capitalize'>
                                        {uniqueNamesGenerator({
                                            dictionaries: [starWars],
                                        }).replace('_', ' ')}
                                        {web3Ctx.account === seller.address ? (
                                            <span className='seller-badge ms-2'>You</span>
                                        ) : null}
                                    </h3>
                                    <p className='text-sm text-primary mb-0'>
                                        {formatPrice(seller.value).toFixed(2)} <span className='text-muted'>ETH</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            );
        });

    return (
        <>
            {marketplaceCtx.mktIsLoading ? <FullScreenLoader heading='loading' /> : null}
            <PageBanner heading={'All Our Authors'} />

            <section className='py-5'>
                <div className='container pt-5'>
                    <div className='row gy-4 mb-5 align-items-stretch'>{renderSellers}</div>

                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={sellers.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </section>
        </>
    );
}

export default Authors;

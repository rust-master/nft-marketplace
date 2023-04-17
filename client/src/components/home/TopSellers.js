import React, { useContext } from 'react';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import Web3Context from '../../store/web3-context';
import MarketplaceContext from '../../store/marketplace-context';
import { formatPrice, configEtherScanUrl } from '../../helpers/utils';
import NoDataAlert from '../general/NoDataAlert';

function TopSellers({ title, description, topSellers }) {
    const web3Ctx = useContext(Web3Context);
    const marketplaceCtx = useContext(MarketplaceContext);

    // Create top sellers template
    const renderTopSellers = topSellers
        .slice(0, 8)
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

    // Render top sellers grid
    return (
        <section className='py-5'>
            <div className='container pb-5'>
                <header className='mb-5'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2>{title}</h2>
                            <p className='text-muted text-sm mb-0'>{description}</p>
                        </div>
                    </div>
                </header>

                <div className='row gy-3'>
                    {renderTopSellers.length > 0 && !marketplaceCtx.mktIsLoading ? (
                        renderTopSellers
                    ) : (
                        <div className='col-lg-9'>
                            <NoDataAlert
                                heading="There're no Sellers at the moment."
                                subheading='Once someone has successfully sell or buy an asset, sellers calculations will take place.'
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TopSellers;

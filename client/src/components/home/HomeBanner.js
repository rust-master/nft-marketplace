import React from 'react';
import { Link } from 'react-router-dom';
// import Particles from 'react-tsparticles';
import { particlesOptions } from '../../helpers/constants';

function HomeBanner() {
    return (
        <section className='hero bg-dark py-5'>
            {/* <Particles options={particlesOptions} /> */}
            <div className='container py-5 z-index-20 position-relative mt-5'>
                <div className='row align-items-center mt-5'>
                    <div className='col-lg-5'>
                        <h1>Create, sell and collect digital items.</h1>
                        <p className='text-muted'>
                            Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset
                            to be unique and therefore not interchangeable
                        </p>
                        <ul className='list-inline'>
                            <li className='list-inline-item'>
                                <Link className='btn btn-gradient-primary' to='/mint'>
                                    Mint NFT
                                </Link>
                            </li>
                            <li className='list-inline-item'>
                                <Link className='btn btn-light' to='/explore'>
                                    Explore
                                </Link>
                            </li>
                        </ul>
                        <div className='d-flex align-items-center pt-5'>
                            <div className='me-4 text-center'>
                                <p className='h1 mb-0'>942</p>
                                <span className='text-muted'>Collectibles</span>
                            </div>
                            <div className='me-4 text-center'>
                                <p className='h1 mb-0'>27k</p>
                                <span className='text-muted'>Auctions</span>
                            </div>
                            <div className='me-4 text-center'>
                                <p className='h1 mb-0'>4k</p>
                                <span className='text-muted'>NFT</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-6 ms-auto d-none d-lg-block'>
                        <img className='img-fluid mx-auto' src=' images/illu-3.png' alt='..' />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;

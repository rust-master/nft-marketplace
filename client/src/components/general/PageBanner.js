import React from 'react';
import { Link } from 'react-router-dom';
// import Particles from 'react-tsparticles';
import { particlesOptions } from '../../helpers/constants';

function PageBanner({ heading }) {
    return (
        <section className='py-5 bg-dark position-relative'>
            {/* <Particles params={particlesOptions} /> */}
            <div className='container py-5 mt-5 z-index-20'>
                <h1 className='text-center'>{heading}</h1>

                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb justify-content-center'>
                        <li className='breadcrumb-item'>
                            <Link className='text-decoration-none d-flex align-items-center' to='/'>
                                {' '}
                                <i className='las la-home la-sm me-1'></i>Home
                            </Link>
                        </li>
                        <li className='breadcrumb-item active' aria-current='page'>
                            {heading}
                        </li>
                    </ol>
                </nav>
            </div>
        </section>
    );
}

export default PageBanner;

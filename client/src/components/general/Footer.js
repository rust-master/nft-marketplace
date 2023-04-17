import React from 'react';
import { useForm } from '@formspree/react';

function Footer() {
    const [state, handleSubmit] = useForm('xlezgplp');

    return (
        <footer className='footer bg-map bg-dark'>
            <div className='container py-5 z-index-20'>
                <div className='row pt-5'>
                    <div className='col-lg-3 col-md-6 mb-4 mb-lg-0'>
                        <h6>Marketplace</h6>
                        <ul className='list-unstyled text-muted mb-0'>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    All NFTs
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Art
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Music
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Domain Names
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Virtual World
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-lg-0'>
                        <h6>Resources</h6>
                        <ul className='list-unstyled text-muted mb-0'>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Help Center
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Partners
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Suggestions
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Discord
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Docs
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-lg-0'>
                        <h6>Community</h6>
                        <ul className='list-unstyled text-muted mb-0'>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Community
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Documentation
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Brand Assets
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Blog
                                </a>
                            </li>
                            <li className='mb-1'>
                                <a className='text-sm text-reset' href='/' rel='noreferrer'>
                                    Forum
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4'>
                        <h6>Newsletter</h6>
                        <p className='text-sm text-muted'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sint facilis.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className='input-group shadow-sm bg-body rounded-sm'>
                                <input
                                    className='form-control border-0 bg-none shadow-0'
                                    type='email'
                                    name='email'
                                    autoComplete='off'
                                    placeholder='Enter your email address...'
                                />
                                <button className='btn btn-primary btn-sm' type='submit'>
                                    <i className='las la-paper-plane'></i>
                                </button>
                            </div>
                        </form>
                        {state.succeeded ? (
                            <p className='bg-primary text-white mt-1 px-3 py-1  rounded-sm'>Thanks!</p>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='pt-1 bg-body rounded-pill'></div>
            </div>

            <div className='container py-4'>
                <div className='row text-center'>
                    <p className='text-muted text-sm mb-0'>
                        © 2022 All rights reserved. Graphic NFT Marketplace
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

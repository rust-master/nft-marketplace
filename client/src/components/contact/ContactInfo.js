import React from 'react';

function ContactInfo(props) {
    return (
        <div className={props.gridWidth}>
            <div className='card'>
                <div className='card-body p-4 p-lg-5'>
                    <h5 className='mb-4'>We are here for help you!</h5>
                    <ul className='list-unstyled mb-4'>
                        <li className='d-flex mb-4'>
                            <div className='contact-icon bd-3 border-primary text-primary flex-shrink-0'>
                                <i className='las la-globe'></i>
                            </div>
                            <div className='ms-3'>
                                <h6>Company Address</h6>
                                <p className='text-sm text-muted mb-0'>23 July st Bank Misr. Gharbeya, Basyun, EG.</p>
                            </div>
                        </li>
                        <li className='d-flex mb-4'>
                            <div className='contact-icon bd-3 border-primary text-primary flex-shrink-0'>
                                <i className='las la-phone'></i>
                            </div>
                            <div className='ms-3'>
                                <h6>Hot lines</h6>
                                <ul className='list-unstyled'>
                                    <li>
                                        <a
                                            className='text-decoration-none text-sm text-muted mb-1'
                                            rel='noreferrer'
                                            href='tel:454759654'
                                        >
                                            +20 454 895 552
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='text-decoration-none text-sm text-muted mb-0'
                                            rel='noreferrer'
                                            href='tel:tel:454759654'
                                        >
                                            +20 454 746 249
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='d-flex mb-3'>
                            <div className='contact-icon bd-3 border-primary text-primary flex-shrink-0'>
                                <i className='las la-envelope'></i>
                            </div>
                            <div className='ms-3'>
                                <h6>Email address</h6>
                                <ul className='list-unstyled mb-0'>
                                    <li>
                                        <a
                                            className='text-decoration-none text-sm text-muted mb-1'
                                            rel='noreferrer'
                                            href='mailto:example@test.com'
                                        >
                                            example@test.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='text-decoration-none text-sm text-muted mb-1'
                                            rel='noreferrer'
                                            href='mailto:company@test.com'
                                        >
                                            company@test.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <h2 className='h5 mb-1'>We are social</h2>
                    <p className='small text-muted mb-3'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis repudiandae cumque architecto.
                    </p>
                    <ul className='list-inline mb-0'>
                        <li className='list-inline-item'>
                            <a className='social-link bg-hover-primary' rel='noreferrer' href='/'>
                                <i className='lab la-facebook-f'></i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='social-link bg-hover-primary' rel='noreferrer' href='/'>
                                <i className='lab la-pinterest'></i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='social-link bg-hover-primary' rel='noreferrer' href='/'>
                                <i className='lab la-twitter'></i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='social-link bg-hover-primary' rel='noreferrer' href='/'>
                                <i className='las la-link'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;

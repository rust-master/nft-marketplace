import React from 'react';

function SuccessMessage({ heading, subheading }) {
    return (
        <>
            <div className='container py-5'>
                <div className='row py-5 text-center'>
                    <div className='col--lg-6 mx-auto'>
                        <p className='mb-0 fw-bold mt-5 mb-0'>
                            <i
                                className='las la-grin-beam'
                                style={{ fontSize: '10rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                            ></i>
                        </p>
                        <h1 className='h2'>{heading}</h1>
                        <p className='text-muted lead d-flex align-items-center justify-content-center'>
                            <span className='miniloader me-4'></span>
                            <span className='h5 mb-0 fw-normal pt-3 mt-1'>{subheading}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessMessage;

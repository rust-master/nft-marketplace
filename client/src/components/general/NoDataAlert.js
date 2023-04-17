import React from 'react';

function NoDataAlert({ heading, subheading }) {
    return (
        <div className='bg-dark p-4 bd-3 text-muted d-flex'>
            <i className='las la-info-circle me-2 mt-1 text-primary' style={{ fontSize: '1.4rem' }}></i>
            <h6 className='fw-light lh-3 text-gray-400 mb-0'>
                {heading}
                <p className='text-muted fst-italic mt-2 text-sm mb-0'>{subheading}</p>
            </h6>
        </div>
    );
}

export default NoDataAlert;

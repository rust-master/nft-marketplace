import React from 'react';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { formatCategory } from '../../helpers/utils';

function ItemPreview({ heading, preview, title, category, author }) {
    return (
        <>
            <div className='d-flex align-items-center mb-4'>
                <div className='icon icon-md me-2 flex-shrink-0 bg-primary rounded-sm text-white'>
                    <i className='las la-eye'></i>
                </div>
                <h2 className='h5 mb-0'>{heading}</h2>
            </div>

            <div className='card rounded shadow-sm'>
                <div className='card-body p-3 position-relative'>
                    <div className='position-relative mb-4 shadow'>
                        <div className='author z-index-20'>
                            {author && (
                                <>
                                    <div
                                        className='ms-3 rounded-circle bd-3 border-dark'
                                        style={{ width: '45px', height: '45px' }}
                                    >
                                        <Jazzicon address={author} />
                                    </div>
                                    <span className='icon bg-primary text-white me-1'>
                                        <i className='las la-check-double'></i>
                                    </span>
                                </>
                            )}
                        </div>
                        <div className='card-img-holder rounded overflow-hidden'>
                            <img className='img-fluid rounded w-100' src={preview} alt={title} />
                        </div>
                    </div>
                    <p className='fw-bold mb-3'>{title === '' ? 'Crypto Funk' : title}</p>
                    <p className='text-sm text-muted fw-normal mb-2 d-flex align-items-center'>
                        <span className='icon bg-primary text-white me-2'>
                            <i className='lab la-ethereum fa-fw'></i>
                        </span>
                        <span>Price: </span>
                        <span className='text-primary ms-2'>0.08 ETH</span>
                    </p>
                    <p className='text-sm text-muted fw-normal d-flex align-items-center'>
                        <span className='icon bg-primary text-white me-2'>
                            <i className='las la-icons fa-fw'></i>
                        </span>
                        <span>Category: </span>
                        <span className='text-primary ms-2'>{formatCategory(category)}</span>
                    </p>
                    <div className='my-3 pt-1 bg-body rounded-pill'></div>
                    <p className='text-muted fw-normal mb-0 text-sm d-flex align-items-center'>
                        <i className='la-sm text-primary las la-clock mx-1 mt-1 text-primary'></i>
                        Created
                        <span className='text-primary mx-2'>12 hrs</span> ago
                    </p>
                </div>
            </div>
        </>
    );
}

ItemPreview.defaultProps = {
    title: 'Crypto Funk',
    category: 'music',
    preview: 'images/items/item-1.jpg',
};

export default ItemPreview;

import React from 'react';

function ItemThumbnail({ thumbnail }) {
    return (
        <div className='card shadow'>
            <div className='card-body'>
                <img className='img-fluid rounded w-100' src={thumbnail} alt='...' />
            </div>
        </div>
    );
}

export default ItemThumbnail;

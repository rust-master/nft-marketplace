import React from 'react';
import { Link } from 'react-router-dom';
import { formatCategory } from '../../helpers/utils';

function Category({ category }) {
    return (
        <p className='text-sm text-muted fw-normal mb-2 d-flex align-items-center'>
            <span className='icon bg-primary text-white me-2'>
                <i className='las la-icons fa-fw'></i>
            </span>
            <span>category: </span>
            {category ? (
                <Link className='text-reset' to={`/categories/${category}`}>
                    <span className='text-primary ms-2'>{formatCategory(category)}</span>
                </Link>
            ) : (
                <span className='text-white ms-2'>No Cateogry</span>
            )}
        </p>
    );
}

export default Category;

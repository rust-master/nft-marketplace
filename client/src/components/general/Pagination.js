import React from 'react';

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                {pageNumbers.map((number, index) => {
                    return (
                        <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    paginate(number);
                                }}
                                href='!#'
                                className='page-link'
                            >
                                {number}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Pagination;

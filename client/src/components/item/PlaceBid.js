import React, { useEffect } from "react";

function PlaceBid() {
    return (
        <div className='row'>
            <div className='col-xl-8'>
                <h2 className='h5 mb-2'>Place a bid</h2>
                <p className='text-muted text-sm mb-4'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis id nobis dolor consequuntur.
                </p>
                <form className='mb-5' action='#!'>
                    <div className='input-group p-1 shadow-sm rounded bg-dark founded'>
                        <input
                            className='form-control border-0 shadow-0 bg-dark'
                            type='text'
                            name='email'
                            autoComplete='off'
                            placeholder='Enter your bid...'
                        />
                        <button className='btn btn-primary btn-sm rounded-sm' type='submit'>
                            <i className='fas fa-paper-plan'></i>Place bid
                        </button>
                    </div>
                </form>

                <h2 className='h5 mb-3'>Share this item</h2>
                <ul className='list-inline'>
                    <li className='list-inline-item'>
                        <a className='social-link' href='#'>
                            <i className='lab la-facebook-f'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a className='social-link' href='#'>
                            <i className='lab la-pinterest'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a className='social-link' href='#'>
                            <i className='lab la-twitter'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a className='social-link' href='#'>
                            <i className='las la-link'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PlaceBid;

import React, { useEffect } from "react";

function ItemInfoTabs(props) {
    const itemBids = props.bids.map((bid, index) => {
        return (
            <li className='d-flex align-items-center rounded p-3 bd-3 bg-dark mb-2 card-hover-minimal' key={index}>
                <img className='img-fluid rounded-circle' src={bid.avatar} alt='...' width='50' />
                <div className='ms-2'>
                    <p className='text-sm mb-1 text-muted'>
                        Bid {bid.accepted ? " accepted" : ""} <span className='text-primary'>{bid.price}</span>
                    </p>
                    <p className='text-sm mb-0 text-muted'>
                        by <span className='text-primary'>{bid.username} </span>at {bid.date}
                    </p>
                </div>
            </li>
        );
    });

    const itemHistory = props.history.map((item, index) => {
        return (
            <li className='d-flex align-items-center rounded p-3 bd-3 bg-dark mb-2 card-hover-minimal' key={index}>
                <img className='img-fluid rounded-circle' src={item.avatar} alt='...' width='50' />
                <div className='ms-2'>
                    <p className='text-sm mb-1 text-muted'>
                        Bid {item.accepted ? " accepted" : ""} <span className='text-primary'>{item.price}</span>
                    </p>
                    <p className='text-sm mb-0 text-muted'>
                        by <span className='text-primary'>{item.username} </span>at {item.date}
                    </p>
                </div>
            </li>
        );
    });

    return (
        <>
            <div className='bg-dark rounded shadow-sm p-1'>
                <ul className='nav nav-pills flex-column flex-sm-row mb-0' id='item-tab' role='tablist'>
                    <li className='nav-item flex-sm-fill' role='presentation'>
                        <button
                            className='nav-link w-100 active'
                            id='item-bids-tab'
                            data-bs-toggle='pill'
                            data-bs-target='#item-bids'
                            type='button'
                            role='tab'
                            aria-controls='item-bids'
                            aria-selected='true'
                        >
                            Bids
                        </button>
                    </li>
                    <li className='nav-item flex-sm-fill' role='presentation'>
                        <button
                            className='nav-link w-100'
                            id='item-description-tab'
                            data-bs-toggle='pill'
                            data-bs-target='#item-description'
                            type='button'
                            role='tab'
                            aria-controls='item-description'
                            aria-selected='false'
                        >
                            Description
                        </button>
                    </li>
                    <li className='nav-item flex-sm-fill' role='presentation'>
                        <button
                            className='nav-link w-100'
                            id='item-history-tab'
                            data-bs-toggle='pill'
                            data-bs-target='#item-history'
                            type='button'
                            role='tab'
                            aria-controls='item-history'
                            aria-selected='false'
                        >
                            History
                        </button>
                    </li>
                </ul>
            </div>

            <div className='tab-content py-3' id='item-tabContent'>
                <div
                    className='tab-pane fade show active'
                    id='item-bids'
                    role='tabpanel'
                    aria-labelledby='item-bids-tab'
                >
                    <ul className='list-unstyled'>{itemBids}</ul>
                </div>

                <div
                    className='tab-pane fade'
                    id='item-description'
                    role='tabpanel'
                    aria-labelledby='item-description-tab'
                >
                    <h6>Description:</h6>
                    <p className='text-muted text-sm'>{props.info}</p>
                </div>

                <div className='tab-pane fade' id='item-history' role='tabpanel' aria-labelledby='item-history-tab'>
                    <ul className='list-unstyled'>{itemHistory}</ul>
                </div>
            </div>
        </>
    );
}

export default ItemInfoTabs;

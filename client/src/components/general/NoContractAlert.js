import React from 'react';

const alertStyle = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9999',
    textAlign: 'center',
};

function NoContractAlert({ network }) {
    let networkName = network;
    if (network === 'main') {
        networkName = 'Mainnet';
    } else if (network === 'private') {
        networkName = 'Private Network';
    }

    return (
        <div className='alert p-3' style={alertStyle}>
            <div className='row w-100'>
                <div className='col-lg-6 mx-auto'>
                    <div className='alert-inner p-4 p-lg-5 bg-dark rounded shadow'>
                        <img src='images/metamask.png' alt='MetaMask' width='50' className='mb-4' />
                        <h4 className='fw-light'>Contracts not deployed to detected network.</h4>
                        <p className='fw-light text-muted mb-0'>
                            Our contracts are deployed to <span className='text-white text-capitalize'>Kovan</span>{' '}
                            network, but The network you're connected to is{' '}
                            <span className='text-white text-capitalize'>{networkName}</span>. Connect to Kovan network
                            and try again.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoContractAlert;

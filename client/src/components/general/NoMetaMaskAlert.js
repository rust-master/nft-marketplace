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

const webExtension = [
    {
        name: 'Chrome',
        url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
        image: 'images/chrome.png',
    },
    {
        name: 'Firefox',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
        image: 'images/firefox.png',
    },
    {
        name: 'Safari',
        url: 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202',
        image: 'images/safari.png',
    },
];

function NoMetaMaskAlert() {
    return (
        <div className='alert p-3' style={alertStyle}>
            <div className='row w-100'>
                <div className='col-lg-6 mx-auto'>
                    <div className='alert-inner p-4 p-lg-5 bg-dark rounded shadow'>
                        <h3 className='fw-light mb-5'>
                            Non Ethereum browser detected. You should consider trying MetaMask!
                        </h3>
                        <ul className='list-inline mb-4'>
                            {webExtension.map((extension, index) => {
                                return (
                                    <li className='list-inline-item mx-3' key={index}>
                                        <a
                                            href={extension.url}
                                            className='text-reset'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <img
                                                src={extension.image}
                                                alt={extension.name}
                                                width='40'
                                                className='mb-3'
                                            />
                                            <p>Download for{extension.name}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        <p className='text-muted mb-0 d-flex align-items-center justify-content-center'>
                            <i className='las la-info-circle me-2 text-primary'></i>
                            Please consider reloading this window after installing the extension.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoMetaMaskAlert;

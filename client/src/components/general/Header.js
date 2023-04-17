import React, { useEffect, useState, useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, NavLink } from 'react-router-dom';
import { navbarChangeStyle } from '../../helpers/utils';
import Web3Context from '../../store/web3-context';
import MarketplaceContext from '../../store/marketplace-context';
import web3 from '../../connection/web3';
import { formatPrice, configEtherScanUrl } from '../../helpers/utils';
import { Jazzicon } from '@ukstv/jazzicon-react';

function Header() {
    const [fundsLoading, setFundsLoading] = useState(false);
    const web3Ctx = useContext(Web3Context);
    const marketplaceCtx = useContext(MarketplaceContext);
    const { addToast } = useToasts();

    useEffect(() => {
        navbarChangeStyle();
    }, []);

    const connectWalletHandler = async () => {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }
        // Load accounts
        web3Ctx.loadAccount(web3);
    };

    const claimFundsHandler = () => {
        marketplaceCtx.contract.methods
            .claimFunds()
            .send({ from: web3Ctx.account })
            .on('transactionHash', (hash) => {
                setFundsLoading(true);
            })
            .on('error', (error) => {
                addToast('Something went wrong when pushing to the blockchain', {
                    appearance: 'error',
                });
                setFundsLoading(false);
            });
    };

    // Event ClaimFunds subscription
    if (!marketplaceCtx.mktIsLoading) {
        marketplaceCtx.contract.events
            .ClaimFunds()
            .on('data', (event) => {
                marketplaceCtx.loadUserFunds(marketplaceCtx.contract, web3Ctx.account);
                setFundsLoading(false);
            })
            .on('error', (error) => {
                console.log(error);
                setFundsLoading(true);
            });
    }

    useEffect(() => {
        if (!marketplaceCtx.mktIsLoading) {
            marketplaceCtx.loadSellers(marketplaceCtx.contract);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marketplaceCtx.mktIsLoading]);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark fixed-top' id='navbar'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    <img className='img-fluid' src='images/logo.png' alt='MIIT' width='140' />
                </Link>

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0 flex-lg-row align-items-lg-center'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/' exact>
                                Home
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/explore'>
                                Explore
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/my-assets'>
                                My Assets
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/authors'>
                                Authors
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/contact'>
                                Contact
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/mint'>
                                Mint NFT
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>
                                <i className='las la-search' style={{ marginTop: '0.125rem' }}></i>
                            </NavLink>
                        </li>

                        {web3Ctx.account && (
                            <li className='nav-item dropdown'>
                                <NavLink
                                    className='nav-link dropdown-toggle d-flex align-items-center'
                                    id='accountDropdown'
                                    to='/'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <div style={{ width: '35px', height: '35px' }}>
                                        <Jazzicon address={web3Ctx.account} />
                                    </div>
                                </NavLink>
                                <ul
                                    className='dropdown-menu dropdown-menu-dark dropdown-menu-end fade-down text-start'
                                    aria-labelledby='accountDropdown'
                                >
                                    <li>
                                        <a
                                            href={configEtherScanUrl(web3Ctx.networkId, web3Ctx.account)}
                                            className='dropdown-item d-flex align-items-center'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <i className='las la-chart-bar me-2 text-primary'></i>
                                            Track transactions
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            to='/my-assets'
                                            className='dropdown-item d-flex align-items-center'
                                            rel='noopener noreferrer'
                                        >
                                            <i className='las la-user-circle me-2 text-primary'></i>
                                            My Assets
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink className='dropdown-item d-flex' to='/expolre'>
                                            <i className='las la-wallet me-2 text-primary'></i>
                                            <div className='ms-0'>
                                                <p className='mb-0 lh-1'>Marketplace Balance</p>
                                                <p className='mb-0 text-primary'>
                                                    {formatPrice(marketplaceCtx.userFunds)} ETH
                                                </p>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {marketplaceCtx.userFunds > 0 && !fundsLoading && (
                                        <li className='p-2'>
                                            <button
                                                type='button'
                                                className='btn btn-gradient-primary w-100'
                                                onClick={claimFundsHandler}
                                            >
                                                Claim funds
                                            </button>
                                        </li>
                                    )}
                                    {fundsLoading && (
                                        <li>
                                            <span class='d-flex justify-content-center'>
                                                <div class='spinner-border' role='status'>
                                                    <span class='sr-only'></span>
                                                </div>
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}

                        {!web3Ctx.account && (
                            <li className='nav-item nav-item ms-lg-2'>
                                <button
                                    type='button'
                                    className='btn btn-gradient-primary btn-sm px-3 d-lg-flex align-items-center'
                                    onClick={connectWalletHandler}
                                >
                                    <i className='las la-wallet me-2 mb-1'></i>
                                    Connect your wallet
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;

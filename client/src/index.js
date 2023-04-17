import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3Provider from './store/Web3Provider';
import CollectionProvider from './store/CollectionProvider';
import MarketplaceProvider from './store/MarketplaceProvider';
import { ToastProvider } from 'react-toast-notifications';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

ReactDOM.render(
    <React.StrictMode>
        <Web3Provider>
            <CollectionProvider>
                <MarketplaceProvider>
                    <ToastProvider autoDismiss autoDismissTimeout={6000} placement='top-center'>
                        <App />
                    </ToastProvider>
                </MarketplaceProvider>
            </CollectionProvider>
        </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

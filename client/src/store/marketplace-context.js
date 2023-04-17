import React from 'react';

const MarketplaceContext = React.createContext({
    contract: null,
    offerCount: null,
    offers: [],
    userFunds: null,
    mktIsLoading: true,
    sellers: null,
    loadContract: () => {},
    loadOfferCount: () => {},
    loadOffers: () => {},
    updateOffer: () => {},
    addOffer: () => {},
    loadSellers: () => {},
    loadUserFunds: () => {},
    setMktIsLoading: () => {},
});

export default MarketplaceContext;

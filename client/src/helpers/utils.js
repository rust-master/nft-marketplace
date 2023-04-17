export const DECIMALS = 10 ** 18;

export const ether = (wei) => wei / DECIMALS;

export const formatPrice = (price) => {
    const precision = 100; // Use 2 decimal places

    price = ether(price);
    price = Math.round(price * precision) / precision;

    return price;
};

export function navbarChangeStyle() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        let windowScroll = document.scrollingElement.scrollTop;
        if (windowScroll >= 10) {
            navbar.classList.add('navbar-active');
        } else {
            navbar.classList.remove('navbar-active');
        }
    });
}

export function formatDate(itemDate) {
    let date1 = new Date();
    let date2 = new Date(itemDate);
    // To calculate the time difference of two dates
    let Difference_In_Time = date1.getTime() - date2.getTime();
    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    let Difference_In_Hours = Math.floor(Difference_In_Time / (1000 * 3600));

    if (Difference_In_Days < 1) {
        return `${Difference_In_Hours} hrs`;
    } else {
        return `${Difference_In_Days} days`;
    }
}

export function formatCategory(category) {
    if (category === 'art') {
        category = 'Art';
    } else if (category === 'trendingCards') {
        category = 'Trading Cards';
    } else if (category === 'domainNames') {
        category = 'Domain Names';
    } else if (category === 'virtualWorlds') {
        category = 'Virtual Worlds';
    } else if (category === 'collectibles') {
        category = 'Collectibles';
    } else if (category === 'music') {
        category = 'Music';
    } else {
        category = 'Unspecified';
    }
    return category;
}

export function truncate(fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;
    separator = separator || '...';
    let sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

    return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}

export function configEtherScanUrl(network, account) {
    let etherscanUrl;
    if (network === 3) {
        etherscanUrl = 'https://ropsten.etherscan.io';
    } else if (network === 4) {
        etherscanUrl = 'https://rinkeby.etherscan.io';
    } else if (network === 42) {
        etherscanUrl = 'https://kovan.etherscan.io';
    } else if (network === 5) {
        etherscanUrl = 'https://goerli.etherscan.io';
    } else if (network === 11155111) {
        etherscanUrl = 'https://sepolia.etherscan.io';
    }
    else {
        etherscanUrl = 'https://etherscan.io';
    }

    return `${etherscanUrl}/address/${account}`;
}

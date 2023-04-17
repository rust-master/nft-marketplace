const path = require('path');

const HDWalletProvider = require("@truffle/hdwallet-provider");

const secrets = require("./client/src/secrets.json");
const mnemonic = secrets.nm;

module.exports = {
    networks: {
        sepolia: {
            provider: () =>
                new HDWalletProvider(
                    mnemonic,
                    `https://sepolia.infura.io/v3/10c613d464d54942ae1d97db8ab5f601`
                ),
            network_id: 11155111,
            gas: 5500000,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        },
    },
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            version: '^0.8.0',
        },
    },
};
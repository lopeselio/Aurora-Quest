const HDWalletProvider = require('@truffle/hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const utils = require('web3-utils')
const MNEMONIC = process.env.MNEMONIC
const startIndex = 0
const numberOfAddresses = 3

const setupWallet = (url) => {
  return new HDWalletProvider({
    mnemonic: MNEMONIC,
    providerOrUrl: url,
    numberOfAddresses
  });
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    aurora: {
      provider: () => setupWallet('https://testnet.aurora.dev'),
      network_id: '1313161555',
      gas: 10000000,
      from: setupWallet('https://testnet.aurora.dev').addresses[0],
      deploymentPollingInterval: 8000,
      timeoutBlocks: 500,
      confirmations: 10,
    },
    goerli: {
      provider: () => setupWallet(`https://goerli.infura.io/v3/${process.env.INFURA_TOKEN}`),
      network_id: '5',
      from: '0xbE8Ace29e3022CD6841821315F82a6C2484fE585',
      gas: 3 * 1000000,
      gasPrice: utils.toWei('8', 'gwei')
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.0+commit.c7dfd78e',
      optimizer: {
        enabled: true,
        runs: 1
      }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ]
};
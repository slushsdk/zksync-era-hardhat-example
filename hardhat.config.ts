import "@matterlabs/hardhat-zksync-toolbox";

const config = {
  zksolc: {
    version: "1.3.8",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncEra",
  networks: {
    zkSyncEra: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
    },
    zkSyncLocal: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
    },
  },
  solidity: {
    version: "0.8.18",
  },
};

export default config;

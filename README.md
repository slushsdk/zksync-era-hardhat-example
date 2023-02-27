# zkSync Era Hardhat example
This simple project provides an example of how to deploy [Solidity](https://soliditylang.org/) contracts to the [zkSync Era network](https://era.zksync.io/docs/) using [Hardhat](https://hardhat.org).

## Prerequisites
- [Node.js](https://github.com/nvm-sh/nvm) (tested with v18.13.0)
- [yarn](https://yarnpkg.com/getting-started/install) (tested with v3.3.1)
- wallet connected to the zkSync Era network ([guide](https://era.zksync.io/docs/dev/fundamentals/interacting.html#connecting-to-zksync-era-on-metamask))
- zkSync [local-setup](https://github.com/matter-labs/local-setup) (optional, for local deployment and testing)

## Initialization
Install the dependencies:
```
yarn install
```

Make a copy of the `.env.example` file and rename it to `.env`:
```
cp .env.example .env
```
Edit it with your preferred text editor: add your wallet's private key to the `PRIVATE_KEY` variable (with `0x` prefix) and leave the `LOCAL_TESTNET_RICH_WALLET_PRIVATE_KEY` as it is.
```
vim .env
```

## Deployment
Compile the example `Greeter` contract:
```
yarn compile
```

```
➜  zksync-era-hardhat-example git:(master) ✗ yarn compile
Successfully compiled 1 Solidity file
```

The deploy command executes the [deploy.ts](deploy/deploy.ts) script, that deploys the [Greeter.sol](contracts/Greeter.sol) contract and calls its `greet` and `setGreeting` functions. Deploy the compiled contract to the zkSync local testnet using the following command:
>Please make sure that the [local testnet](https://github.com/matter-labs/local-setup) is already running before you execute this command!
```
yarn deploy:local
```

```
➜  zksync-era-hardhat-example git:(master) ✗ yarn deploy:local
Running example deploy script for the Greeter contract

Depositing 0.001 ETH from L1 to L2...
Deposit processed.

Greeter contract deployment started...
Greeter contract deployment finished.
Contract address: 0x996462e0eAf00bF6BF0Ea15F29d715C0eD3906F1
Constructor args: 0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c48656c6c6f207468657265210000000000000000000000000000000000000000

Calling the greet function...
Function responded with: Hello there!
```

The contract can also be deployed to the zkSync Era network:
```
yarn deploy:era
```

## Scripts
Other scripts in the `deploy` directory can be executed using the `script` command followed by the script's filename (e.g. `yarn script:local filename` or `yarn script:era filename`).

There are 2 examples in addition to the deploy script in the [deploy](deploy) folder, they are explained below.

### Deposit

The [deposit.ts](deploy/deposit.ts) is an example of how to deposit some funds from L1 to L2. Use the following command to run the `deposit.ts` script:
```
yarn script:era deposit
```
```
zksync-era-hardhat-example git:(master) ✗ yarn script:era deposit
Running example deploy script for the Greeter contract

Depositing 0.001 ETH from L1 to L2...
========= NOTICE =========
Request-Rate Exceeded  (this message will not be repeated)

The default API keys for each service are provided as a highly-throttled,
community resource for low-traffic projects and early prototyping.

While your application will continue to function, we highly recommended
signing up for your own API keys to improve performance, increase your
request rate/limit and enable other perks, such as metrics and advanced APIs.

For more details: https://docs.ethers.io/api-keys/
==========================
Deposit processed.
```
It does not really makes sense to do deposits on local testnet because there are several [rich wallets](https://era.zksync.io/docs/api/hardhat/testing.html#rich-wallets) with large amount of funds, but of course the script can be executed with the local command as well:
```
yarn script:local deposit
```
```
➜  zksync-era-hardhat-example git:(master) ✗ yarn script:local deposit   
Running example deploy script for the Greeter contract

Depositing 0.001 ETH from L1 to L2...
Deposit processed.
```

### Interact
The [interact.ts](deploy/interact.ts) contains an example of how to interact with an already deployed contract, it shows how to attach to it and how to call its READ and WRITE functions. Use the following command to run the `interact.ts` script:
>Please make sure that before running the script the `contractAddress` variable has been set to a deployed contract's address.
```
yarn script:local interact
```
```
zksync-era-hardhat-example git:(master) ✗ yarn script:local interact
Running example interact script for the Greeter contract

Attaching to Greeter contract (0x22F4D93be0E8C0C081e74c0d5e697B64eEA007FF)...
Attached to Greeter contract.

Calling the greet function...
Function responded with: Hello There!

Setting a new greeting wit the setGreeting function...
New greeting set.

Calling the greet function...
Function responded with: General Kenobi!
```

Similarly, to interact with the `Greeter` contract on the Era network:
```
yarn script:era interact.ts
```

## Tests
To run the tests use the following command:
>Please make sure that the [local testnet](https://github.com/matter-labs/local-setup) is already running before you execute this command!
```
yarn test
```

```
➜  zksync-era-hardhat-example git:(master) yarn test        
Successfully compiled 1 Solidity file


  Greeter
    constructor
      ✔ should greet with the initial greeting (1799ms)
    setGreeting
      ✔ should greet with the greeting set by the setGreeting (2914ms)


  2 passing (5s)
```

## Clean
The `yarn clean` command removes the folder containing the compiled artifacts:
```
yarn clean
```

## Recompile
If the artifacts folder is not empty, the contract will not be recompiled. Always run the `yarn clean` followed by `yarn compile` to recompile:
```
yarn clean && yarn compile
```

## Credits
This example is based on the [zkSync Era Documentation](https://github.com/matter-labs/zksync-web-era-docs), extends it and makes it easier to get started.

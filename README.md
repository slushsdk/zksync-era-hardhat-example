# zkSync Era Contract Deployment Demo
This simple project provides an example of how to deploy [Solidity](https://soliditylang.org/) contracts to the [zkSync Era network](https://era.zksync.io/docs/) using [Hardhat](https://hardhat.org).

## Prerequisites
- [Node.js](https://github.com/nvm-sh/nvm) (tested with v18.13.0)
- [yarn](https://yarnpkg.com/getting-started/install) (tested with v3.3.1)
- wallet connected to the zkSync Era network ([guide](https://era.zksync.io/docs/dev/fundamentals/interacting.html#connecting-to-zksync-era-on-metamask))
- zkSync [local-setup](https://github.com/matter-labs/local-setup) (optional, for local deployment and testing)

## Initialization
Install the dependencies
```
yarn install
```

Make a copy of the `.env.example` file and rename it to `.env`
```
cp .env.example .env
```
Edit it with your preferred text editor: add your wallet's private key to the `PRIVATE_KEY` variable (with `0x` prefix) and leave the `LOCAL_TESTNET_RICH_WALLET_PRIVATE_KEY` as it is.
```
vim .env
```

## Deployment
Compile the example `Greeter` contract
```
yarn compile
```

```
➜  zksync-era-contract-deployment-demo git:(master) ✗ yarn compile
Successfully compiled 1 Solidity file
```

Deploy the compiled contract to the zkSync Era network
```
yarn deploy:era
```

By default the deploy command executes all of the scripts present in the deploy folder (in this demo there are 2 scripts: `deploy.ts` and the `interact.ts`, therefore both are executed). To only run one of the scripts use the command followed by the `--script` flag. For example to only execute the `deploy.ts` script use the following command:
```
yarn deploy:era --script deploy/deploy.ts
```

The contract can also be deployed to the zkSync local testnet
>Please make sure that the [local testnet](https://github.com/matter-labs/local-setup) is already running before you execute this command!
```
yarn deploy:local
```

```
➜  zksync-era-contract-deployment-demo git:(master) ✗ yarn deploy:local
Running example deploy script for the Greeter contract

Depositing 0.001 ETH from L1 to L2...
Deposit processed.

Greeter contract deployment started...
Greeter contract deployment finished.
Contract address: 0x996462e0eAf00bF6BF0Ea15F29d715C0eD3906F1
Constructor args: 0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c48656c6c6f207468657265210000000000000000000000000000000000000000

Calling the greet function...
Function responded with: Hello there!

Running example interact script for the Greeter contract

Attaching to Greeter contract (0x22F4D93be0E8C0C081e74c0d5e697B64eEA007FF)...
Attached to Greeter contract.

Calling the greet function...
Function responded with: General Kenobi!

Setting a new greeting wit the setGreeting function...
New greeting set.

Calling the greet function...
Function responded with: General Kenobi!

```

## Tests
To run the tests use the following command:
>Please make sure that the [local testnet](https://github.com/matter-labs/local-setup) is already running before you execute this command!
```
yarn test
```

```
➜  zksync-era-contract-deployment-demo git:(master) yarn test        
Successfully compiled 1 Solidity file


  Greeter
    constructor
      ✔ should greet with the initial greeting (1799ms)
    setGreeting
      ✔ should greet with the greeting set by the setGreeting (2914ms)


  2 passing (5s)

```

## Clean
The `yarn clean` command removes the folder containing the compiled artifacts.
```
yarn clean
```

## Recompile
If the artifacts folder is not empty, the contract will not be recompiled. Always run the `yarn clean` followed by `yarn compile` to recompile.
```
yarn clean && yarn compile
```

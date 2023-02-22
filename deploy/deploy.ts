import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as dotenv from "dotenv";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { utils, Wallet } from "zksync-web3";

// env vars from the .env file.
dotenv.config();

const deploy = async (hre: HardhatRuntimeEnvironment) => {
  console.log(`Running example deploy script for the Greeter contract`);
  console.log();

  // private key from env var
  const privateKey = (hre.network.name === "zkSyncLocal") ?
    process.env.LOCAL_TESTNET_RICH_WALLET_PRIVATE_KEY : process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(`Please set your PRIVATE_KEY in the '.env' file. Use the '.env.example' file as an example.`);
  }

  // artifact loading
  const wallet = new Wallet(privateKey)
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");


  // fund deposit to L2 (comment out this block if depositing not needed)
  console.log(`Depositing 0.001 ETH from L1 to L2...`)
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  await depositHandle.wait();
  console.log("Deposit processed.")
  console.log();


  // contract deployment
  console.log(`${artifact.contractName} contract deployment started...`);
  const greeting = "Hello there!";
  const constructorArguments = [greeting];
  const greeterContract = await deployer.deploy(artifact, constructorArguments);
  console.log(`${artifact.contractName} contract deployment finished.`);
  console.log(`Contract address: ${greeterContract.address}`);
  console.log(`Constructor args: ${greeterContract.interface.encodeDeploy(constructorArguments)}`);
  console.log();


  // greet function call (READ)
  console.log(`Calling the greet function...`)
  const greetingFromContract = await greeterContract.greet();
  console.log(`Function responded with: ${greetingFromContract}`)
  console.log();
}

export default deploy;

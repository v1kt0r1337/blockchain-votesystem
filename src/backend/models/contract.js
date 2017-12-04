/**
 * Created by archheretic on 27.11.17.
 */

const Web3 = require("web3");
const web3 = new Web3();
const fs = require("fs");
const path = require("path");

// Our files
const contractPath = require("../../../contracts/contractPath");

const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

/**
 * This functions returns a new empty voter contract.
 */
function getContracts() {
    const source = fs.readFileSync(path.join(contractPath, "contracts.json"));
    return JSON.parse(source)["contracts"];
}

/**
 * Sets the contractDeployment callback, and prints extra information information related to the blockchain deployment.
 */
function contractDeploymentInfo(contract, callback) {
    console.log("Deploying the contract");
    // Transaction has entered to geth memory pool
    console.log("Your contract is being deployed in transaction at https://ropsten.etherscan.io/tx/" + contract.transactionHash);
    callback(null, "https://ropsten.etherscan.io/tx/" + contract.transactionHash);
    // // This code is commented out due to performance issues, but is still interesting, so I haven't removed it...
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    //
    // // We need to wait until any miner has included the transaction
    // // in a block to get the address of the contract
    //
    // async function waitBlock() {
    //     while (true) {
    //         const receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    //         if (receipt && receipt.contractAddress) {
    //             console.log("Your contract has been deployed at https://ropsten.etherscan.io/address/" + receipt.contractAddress);
    //             console.log("Note that it might take 30 - 90 seconds for the block to propagate before it's visible in etherscan.io");
    //             break;
    //         }
    //         console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    //         await sleep(4000);
    //     }
    // }
    // waitBlock();
}

module.exports = {getContracts, contractDeploymentInfo};
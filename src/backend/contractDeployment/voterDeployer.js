/**
 * Created by archheretic on 29.10.17.
 *
 * Very rough code needs heavy refactoring
 */
// const Voter = artifacts.require("../../contracts/Voter.sol");
// const Ballot = artifacts.require("../../contracts/Ballot.sol");
const Web3 = require("web3");
const config = require("config");
const fs = require("fs");
const web3 = new Web3();
const contractPath = require("../../../contracts/contractPath");
const path = require("path");

// ugly in real production
const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

const VoterDeployer = {

    openWallet: function() {
        // Unlock the coinbase account to make transactions out of it
        console.log("Unlocking coinbase account");
        try {
            web3.personal.unlockAccount(config.address, config.password);
        } catch(e) {
            console.log(e);
        }
    },

    createSmartContractObject: function () {

        const source = fs.readFileSync(path.join(contractPath, "contracts.json"));
        const contracts = JSON.parse(source)["contracts"];

        // ABI description as JSON structure
        const abi = JSON.parse(contracts["Ballot.sol:Voter"].abi);
        // Smart contract EVM bytecode as hex
        const code = '0x' + contracts["Ballot.sol:Voter"].bin;
        // Create Contract proxy class
        console.log(abi);
        const contract = web3.eth.contract(abi);
        return {VoterContract: contract, code};
    },

    deployVoterContract: function(ssn, password, callback) {
        const {VoterContract, code} = this.createSmartContractObject();
        // This wallet should be closed after completion, but not that important for this project...
        this.openWallet();
        console.log("Deploying the contract");
        const contract = VoterContract.new(ssn, password , {from: web3.eth.coinbase, gas: 1000000, data: code});

        // Transaction has entered to geth memory pool
        console.log("Your contract is being deployed in transaction at https://ropsten.etherscan.io/tx/" + contract.transactionHash);
        callback(null, "https://ropsten.etherscan.io/tx/" + contract.transactionHash);
        // http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms);
        }

        // We need to wait until any miner has included the transaction
        // in a block to get the address of the contract
        async function waitBlock() {
            while (true) {
                let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
                if (receipt && receipt.contractAddress) {
                    console.log("Your contract has been deployed at https://ropsten.etherscan.io/address/" + receipt.contractAddress);
                    console.log("Note that it might take 30 - 90 seconds for the block to propagate before it's visible in etherscan.io");
                    break;
                }
                console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
                await sleep(4000);
            }
        }

        waitBlock();
    },
};

module.exports = VoterDeployer;

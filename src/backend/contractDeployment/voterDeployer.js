/**
 * Created by archheretic on 29.10.17.
 *
 * Inspired by: https://github.com/TokenMarketNet/ethereum-smart-contract-transaction-demo
 * Very rough code needs heavy refactoring
 */
const Web3 = require("web3");
const web3 = new Web3();
const config = require("config");
const fs = require("fs");
const path = require("path");

// Our files
const contractPath = require("../../../contracts/contractPath");
const wallet = require("../wallet");

const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

const VoterDeployer = {
    /**
     * This functions returns a new empty voter contract.
     */
    createVoterContractObject: function () {
        const source = fs.readFileSync(path.join(contractPath, "contracts.json"));
        const contracts = JSON.parse(source)["contracts"];
        // ABI (APPLICATION BINARY INTERFACE) description as JSON structure
        const abi = JSON.parse(contracts["Ballot.sol:Voter"].abi);
        // Smart contract EVM bytecode as hex
        const code = '0x' + contracts["Ballot.sol:Voter"].bin;
        // Create Contract proxy class
        // console.log(abi);
        // console.log('0x' + contracts["Ballot.sol:Voter"]["bin-runtime"]);
        const contract = web3.eth.contract(abi);
        return {VoterContract: contract, code};
    },

    /**
     * Deployes a new voter contract to the blockchain.
     */
    deployVoterContract: function(ssn, password, callback) {
        const {VoterContract, code} = this.createVoterContractObject();
        wallet.openWallet();
        console.log("Deploying the contract");
        const contract = VoterContract.new(ssn, password , {from: web3.eth.coinbase, gas: 1000000, data: code});

        // Transaction has entered to geth memory pool
        console.log("Your contract is being deployed in transaction at https://ropsten.etherscan.io/tx/" + contract.transactionHash);
        callback(null, "https://ropsten.etherscan.io/tx/" + contract.transactionHash);
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
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

    getVoters: function() {
        const {VoterContract, code} = this.createVoterContractObject();
        const voterHashes = this.getWalletsContractHashes();
        const potentialVoters = voterHashes.map(e => VoterContract.at(e));
        return potentialVoters.filter(e => e == this.isVoter(e));
    },

    /**
     * Returns the checksum of the compiled voter contract.
     */
    getVoterContractCheckSum: function () {
        const source = fs.readFileSync(path.join(contractPath, "contracts.json"));
        const contracts = JSON.parse(source)["contracts"];
        const binary = "0x" + contracts["Ballot.sol:Voter"]["bin-runtime"];
        return web3.sha3(binary);
    },

    isVoter: function(allegedVoter) {
        const checksum = web3.sha3(allegedVoter.getCode.call(allegedVoter.address));
        return checksum === this.getVoterContractCheckSum();
    },

    getWalletsContractHashes: function(walletAddress=config.address, startBlockNumber=2152000, endBlockNumber=2152552) {
        const txHashes = this.getTXHashesFromWalletAddress(startBlockNumber, endBlockNumber, walletAddress);
        // There is a chance that there is no contracts on that transaction, so we need to filter away undefined.
        const contractHashes = txHashes.map(txHash => this.getContractFromTxHash(txHash)).filter(e => e != undefined);
        console.log(contractHashes);
        return contractHashes;
    },

    getTXHashesFromWalletAddress: function(startBlockNumber, endBlockNumber, myAddress) {
        if (!startBlockNumber) {
            startBlockNumber = 0;
        }
        if (!endBlockNumber) {
            endBlockNumber = web3.eth.blockNumber;
        }
        console.log("Searching for transactions from address " + myAddress+ " within blocks "  + startBlockNumber + " -> " + endBlockNumber);
        const txHashes = [];
        for (let i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 === 0) {
                console.log("Searching block " + i);
            }
            const block = web3.eth.getBlock(i, true);
            if (block != null && block.transactions != null) {
                block.transactions.forEach((tx) => {
                    if (config.address == tx.from) {
                        console.log("Found TXHash: " + tx.hash);
                        txHashes.push(tx.hash);
                    }
                })
            }
        }
        console.log("Search Completed");
        return txHashes;
    },

    getContractFromTxHash: function(txHash) {
        const txInfo = web3.eth.getTransactionReceipt(txHash);
        console.log("Contract address: " + txInfo.contractAddress + " retrieved from transaction address: " + txHash);
       // console.log(txInfo);
        return txInfo.contractAddress;
    }
};

module.exports = VoterDeployer;

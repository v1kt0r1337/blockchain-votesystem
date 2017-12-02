/**
 * Created by archheretic on 28.11.17.
 */
const Web3 = require("web3");
const web3 = new Web3();
const { getContracts, contractDeploymentInfo } = require("./contract");
const { openWallet } = require("../wallet");
const { getVotersAddressesFromBlockchain } = require("./voter");

const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

function deployElectionContract(electionName, candidateList, daysUntilExpire, startBlockNumber, endBlockNumber, callback) {
    const {ElectionContract, code} = getElectionContract();
    const voters = getVotersAddressesFromBlockchain(startBlockNumber, endBlockNumber);
    openWallet();
    const contract = ElectionContract.new(electionName, candidateList, daysUntilExpire, voters,
        {from: web3.eth.coinbase, gas: 1000000, data: code});
    contractDeploymentInfo(contract, callback);
}

function getElectionContract() {
    const contracts = getContracts();
    // ABI (APPLICATION BINARY INTERFACE) description as JSON structure
    const abi = JSON.parse(contracts["Election.sol:Election"].abi);
    // Smart contract EVM bytecode as hex
    const code = "0x" + contracts["Election.sol:Election"].bin;
    // Create Contract proxy class
    const contract = web3.eth.contract(abi);
    return {ElectionContract: contract, code};
}

function getElectionCandidates(contractAddress, callback) {
    const {ElectionContract, code} = getElectionContract();
    const electionContract = ElectionContract.at(contractAddress);
    electionContract.getCandidateList.call({from: web3.eth.coinbase,to: contractAddress}, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            const parsedResult = result.map((e) => web3.toUtf8(e));
            callback(null, parsedResult);
        }
    });
}

function getElectionResults(contractAddress, callback) {
    getElectionCandidates(contractAddress, (err, candidates) => {
        if (err) {
            callback(err);
        }

        else {
            const {ElectionContract, code} = getElectionContract();
            const results = [];
            let error;
            for (const candidate of candidates) {
                const electionContract = ElectionContract.at(contractAddress);
                electionContract.totalVotesFor.call(candidate, {from: web3.eth.coinbase, to: contractAddress}, (err, result) => {
                    if (err) {
                        error = err;
                    }
                    else {
                        results.push({candidate:candidate, votes: result});
                    }
                    if (results.length === candidates.length) {
                        callback(error, results);
                    }
                });
            }
        }
    });
}

module.exports = {
    deployElectionContract,
    getElectionCandidates,
    getElectionResults,
};
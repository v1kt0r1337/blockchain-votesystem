/**
 * Created by archheretic on 28.11.17.
 */
const Web3 = require("web3");
const web3 = new Web3();
const config = require("config");;
const { getContracts, contractDeploymentInfo } = require("./contract");
const { openWallet } = require("../wallet");
const { getVotersAddressesFromBlockchain } = require("./voter");

const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

function deployBallotContract(candidateNames, daysUntilExpire, callback) {
    const {BallotContract, code} = getBallotContract();
    const voters = getVotersAddressesFromBlockchain();
    openWallet();
    const contract = BallotContract.new(candidateNames, daysUntilExpire, voters, {from: web3.eth.coinbase, gas: 1000000, data: code});
    contractDeploymentInfo(contract, callback);
}

function getBallotContract() {
    const contracts = getContracts();
    // ABI (APPLICATION BINARY INTERFACE) description as JSON structure
    const abi = JSON.parse(contracts["Ballot.sol:Ballot"].abi);
    // Smart contract EVM bytecode as hex
    const code = "0x" + contracts["Ballot.sol:Ballot"].bin;
    // Create Contract proxy class
    const contract = web3.eth.contract(abi);
    return {BallotContract: contract, code};
}

module.exports = { deployBallotContract }
/**
 * Created by archheretic on 27.11.17.
 */
const Web3 = require("web3");
const web3 = new Web3();
const config = require("config");
const fs = require("fs");
const path = require("path");
const { getContracts, contractDeploymentInfo } = require("./contract");
const { getWalletsContractAddresses, openWallet } = require("../wallet");

const contractPath = require("../../../contracts/contractPath");
const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

function deployVoterContract(ssn, password, callback) {
    const {VoterContract, code} = getVoterContract();
    openWallet();
    const contract = VoterContract.new(ssn, password, {from: web3.eth.coinbase, gas: 1000000, data: code});
    contractDeploymentInfo(contract, callback);
}

/**
 * Returns all voters on the blockchain created from the wallet address in specified in the config files.
 */
function getVotersFromBlockchain() {
    const {VoterContract, code} = getVoterContract();
    const contractAddresses = getWalletsContractAddresses();
    const potentialVoters = contractAddresses.map(e => VoterContract.at(e));
    return potentialVoters.filter(e => e != isVoter(e));
}

function getVoterContract() {
    const contracts = getContracts();
    // ABI (APPLICATION BINARY INTERFACE) description as JSON structure
    const abi = JSON.parse(contracts["Ballot.sol:Voter"].abi);
    // Smart contract EVM bytecode as hex
    const code = "0x" + contracts["Ballot.sol:Voter"].bin;
    // Create Contract proxy class
    const contract = web3.eth.contract(abi);
    return {VoterContract: contract, code};
}

function isVoter(potentialVoter) {
    const checksum = web3.sha3(web3.eth.getCode(potentialVoter.address));
    return checksum === getVoterContractCheckSum();
}

/**
 * Returns the checksum of the compiled voter contract.
 */
function getVoterContractCheckSum() {
    const source = fs.readFileSync(path.join(contractPath, "contracts.json"));
    const contracts = JSON.parse(source)["contracts"];
    const binary = "0x" + contracts["Ballot.sol:Voter"]["bin-runtime"];
    return web3.sha3(binary);
}

module.exports = {deployVoterContract, getVotersFromBlockchain};

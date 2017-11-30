/**
 * Created by archheretic on 27.11.17.
 */

const Web3 = require("web3");
const web3 = new Web3();
const config = require("config");
const address = "http://localhost:8545";
web3.setProvider(new web3.providers.HttpProvider(address));

/**
 * This function unlocks the ethereum coinbase account.
 * If no parameter is given the account will be open for 120 seconds.
 * If the account is already open it will just refresh the duration.
 * Be aware that opening the account leaves it open for withdrawal by other programs running on the node.
 */
function openWallet(duration=120) {
    console.log("Unlocking coinbase account");
    try {
        web3.personal.unlockAccount(config.address, config.password, duration);
    } catch(e) {
        console.log(e);
    }
}

function getWalletsContractAddresses(startBlockNumber=2169240, endBlockNumber=2169250, walletAddress=config.address) {
    const txHashes = getTxHashesFromWalletAddress(startBlockNumber, endBlockNumber, walletAddress);
    // There is a chance that there is no contracts on that transaction, so we need to filter away undefined.
    const contractAddresses = txHashes.map(txHash => getContractFromTxHash(txHash)).filter(e => e != undefined);
    // console.log(contractAddresses);
    return contractAddresses;
}

function getTxHashesFromWalletAddress(startBlockNumber, endBlockNumber, myAddress) {
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
}

function getContractFromTxHash(txHash) {
    const txInfo = web3.eth.getTransactionReceipt(txHash);
    console.log("Contract address: " + txInfo.contractAddress + " retrieved from transaction address: " + txHash);
    // console.log(txInfo);
    return txInfo.contractAddress;
}

module.exports = {openWallet, getWalletsContractAddresses};
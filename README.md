# Blockchain-votesystem

## Disclaimer
This project is not meant to be used on any election of importance.
I'm also not responsible for any Ethereum you might lose when running or fiddling with this project...

## Table of Contents
- [About](#about)
- [Docker Image](#docker-image)
- [Prerequisites](#prerequisites)
    - [Geth](#geth)
    - [Node.js and npm](#Node.jsandnpm)
- [Getting Started](#getting-started)
    - [Ethereum blockchain](#ethereumblockchain)
    - [Blockchain-votesystem](#blockchain-votesystem)
    - [Smart contracts](#smartcontracts)
- [How to run](#how-to-run)

## About
Checkout our [wiki!](https://github.com/Archheretic/blockchain-votesystem/wiki)

## Docker Image

Docker image can be found at: https://hub.docker.com/r/archheretic/blockchain-votesystem/
To use the Docker container you still need to follow the first step in the [Prerequisites](#prerequisites)

## Prerequisites

First step is also required for if you run the project in a docker container.

### Geth (also needed for Docker container)
This project expect to interact with the ethereum blockchain through Geth rpc api.
You can find instructions on how to install Geth on platforms in the link below. 
https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum

The space requirements at the time of this writing is 30 Gb for the testnet blockchain. 
They also have a Geth docker image, but due to the hefty space requirements of running two seperate fullnodes 
I've not been able to fully test it.

Sync to the Ropsten testnet
```sh
geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
```
To check how far your syncing progress has come check your "number" value up against the newest block value on:
https://ropsten.etherscan.io/

If you don't already have a wallet address you will need to create an account that you can use for this project.
If you do have a wallet on with real Ethereum on your computer, make sure do the required research before you continue (read [Disclaimer](#disclaimer)).
```sh
$ geth account new
```
For more information go to:
https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

Transactions costs gas, so you need Ethereum. Luckily mining Ethereum on testnet is quite fast.
This can be done with the following command:
```sh
$ geth --testnet --mine 
```
For more information go to:
https://github.com/ethereum/go-ethereum/wiki/Mining

### Node.js and npm 
This application requires Node.js and npm. If you don't have Node.js go to https://nodejs.org/en/ for further instruction.


## Getting Started

### Ethereum blockchain

Start full node with rpc api:
```sh
geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
```

### Blockchain-votesystem
First install all the dependencies with:
```sh
$ npm install
```

Then build the React project with:
```sh
$ npm run build
```

### Smart contracts
The smart contracts should already be compiled, but if you want to recompile the contracts or make changes to them
then you can you can use the solc solidity compiler: 
http://solidity.readthedocs.io/en/develop/installing-solidity.html
 
It's important that this is done in the exact same path as the contract code.
First navigate to project directory "contracts", then:
```sh
solc Election.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
```

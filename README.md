Start full node with rpc api:
```sh
geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
```

Compile contracts with Solc. 
It's important that this is done in the exact same path as the contract code.
First navigate to project directory "contracts", then:
```sh
solc Election.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
```

To run docker image:
```sh
docker run -d --net host --name vote -e PORT=3000 -e ADDRESS=yourWalletAddress -e PASSWORD=yourpassword -p 3000:3000 archheretic/blockchain-votesystem
```


16:50:04 <+archheretic> Har et litt rart voting system
Har 2 smart kontrakter: Election (Stemmeseddel) og Voter. Vanlige folk som oss skal kunne lage en Voter gjennom dette 
grensesnittet (bruker min wallet addresse), og kun disse skal kunne brukes til å stemme i Election. Hver Election tar inn 
Voter[] voters som parameter i sin konstruktor. 
Så derfor må må jeg enten mellomlagre alle hash addressene til Voter kontraktene i en egen database, 
eller hente de ut fra Ethereums blockchain. Jeg har da valgt det sistnevnte. 
For å gjøre dette så looper jeg over alle blokkene mellom x og y i blockchainen og leter etter transaksjoner gjort med 
min wallet addressene. Etter jeg har funnet alle transaksjoene bruker jeg deres transaksjons adresse (hash) til å 
finne alle Voter kontraktene som er deployet på blockchainen. Etter å ha validert at dette er riktige kontrakter 
gjennom å sjekke deres checksum, så lager jeg en array av Voter kontraktenes adresse, og sender den inn i konstruktoren til Election.

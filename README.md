# Kickstart
Kickstart is a POW crowfunding plateform using Ethereum Smart Contract...
<br>

<p align="center">
   <img src="https://thumbs.gfycat.com/SmoothQuarrelsomeGermanspitz-size_restricted.gif"/>
</p>


## Built With

* [Ethereum](https://github.com/ethereum/) - Ethereum Network
* [Solidity](https://github.com/ethereum/) - Contract-Oriented Programming Language
* [Nodejs](https://github.com/nodejs/node) - Node.js JavaScript runtime
* [Next](https://github.com/ethereum/solidity) -  Lightweight framework for server‑rendered applications.
* [Metamask](https://github.com/MetaMask/metamask-extension) -  Browser extension for browsing Ethereum blockchain enabled websites

### Feature
* Create new campaigns; Users can create new campaigns using Metamask
* Add Campaigns requests, When desired Campaigns owners can ask for a transfert requests...
* Validate new requests; Contributors of the campaigns can validate requests
* Withdraw funds; Uppon contributor validation campaigns owners can withdraw funds.

### Local Instalation
* Clone Repo
```bash
$ git clone https://github.com/ThalKod/kickstart.git
```
* Install Node modules
```bash
$ npm install
```
* Built nextjs
```bash
$ npm run build
```
* Start the applicaton
```bash
$ npm start
```
### Deploy Script
If you want to deploy a new root contract, you can do so by setting up a deploy scripts in the ethereum/ Folder
* Template for a deploy script : 
```js
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3  = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
    YOUR_SEED,
    YOUR_NODE_PROVIDER_ADDRESS
);

const web3 = new Web3(provider);

// web3.eth.getAccounts().then((accounts)=>{
//     console.log("Attempting to deploy from Account " + accounts[0]);
//     new web3.eth.Contract(JSON.parse(interface))
//         .deploy({data: bytecode, arguments: ["Hi, There"]})
//         .send({gas: "7000000", from: accounts[0]}).then((res)=>{
//             console.log("Contract deployed to ", res.options.address);
//         }).catch((e)=>{
//             console.log(e);
//         });

// }).catch((e)=>{
//     console.log(e);
// });

const deploy = async ()=>{

    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    console.log("Attempting to deploy from Account " + accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: "0x" + compiledFactory.bytecode})
        .send({gas: "1000000", from: accounts[0]});

        console.log("Contract deployed to ", result.options.address);
};
deploy();
```






const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3  = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
    "salmon bomb trick destroy person opera nose access lava still sister hip",
    "https://kovan.infura.io/u6Q0kjZklOqkYsQp2q7E"
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

// Deployed to 0xc2A33B38898C465EC3C4ebD3DAe77208352Eb434
import Web3 from "web3";

let web3;

if(typeof window !== "undefined" && typeof window.web3 !== "undefined"){
    // ..using the Metamask provider
    web3 = new Web3(window.web3.currentProvider);
}else{
    const provider = new Web3.providers.HttpProvider("https://kovan.infura.io/u6Q0kjZklOqkYsQp2q7E");

    web3 = new Web3(provider);
}

export default web3;
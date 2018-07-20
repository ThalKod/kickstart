import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xc2A33B38898C465EC3C4ebD3DAe77208352Eb434"
);

export default instance;

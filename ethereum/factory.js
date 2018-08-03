import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xC31DE1062B94A4c780Ba363fc80aD569d01a3457"
);

export default instance;

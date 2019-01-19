import web3 from "./web3";
import temp from "./build/temp.json";

const eco_coin_sale = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin_Sale"];
const sale_abi = eco_coin_sale.abi;
const instance = new web3.eth.Contract(
    sale_abi,
    '0xf1D9B02A3636b380B767F9536A8EC4746b5bD8A9'
);

export default instance;

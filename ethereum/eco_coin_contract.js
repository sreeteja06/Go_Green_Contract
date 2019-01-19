import web3 from "./web3";
import temp from "./build/temp.json";

const eco_coin = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin"];
const coin_abi = eco_coin.abi;
const instance = new web3.eth.Contract(
    coin_abi,
    '0xE92B7EcAdce3453A296Db27460eaf2F5E668E96b'
);

export default instance;
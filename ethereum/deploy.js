const HDwalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const temp = require("./build/temp.json");
const { seed } = require("./seed");

const eco_coin = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin"];
const eco_coin_sale = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin_Sale"];

const provider = new HDwalletProvider(
  seed,
  "https://rinkeby.infura.io/v3/ec2f8b79db3b4da587c4c5299162f65c"
);

const web3 = new Web3(provider);

const coin_byteCode = eco_coin["evm"]["bytecode"]["object"];
const sale_byteCode = eco_coin_sale["evm"]["bytecode"]["object"];

let accounts, coin_result, sale_result;

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  try {
    coin_result = await new web3.eth.Contract(eco_coin.abi)
      .deploy({ data: "0x" + coin_byteCode, arguments: ["2000"] })
      .send({ gas: 4500000, from: accounts[0] });
  } catch (e) {
    console.log("Error in coin contract deployment" + e);
  }
  try {
    sale_result = await new web3.eth.Contract(eco_coin_sale.abi)
      .deploy({ data: "0x" + sale_byteCode, arguments: [coin_result.options.address, 1, 9, 1] })
      .send({ gas: 4500000, from: accounts[0] });
  } catch (e) {
    console.log("Error in sale contract deployment" + e);
  }
  console.log("the eco coin contract is deployed at: "+coin_result.options.address);
  console.log("the eco coin sale contract is deployed at: "+sale_result.options.address);
};

deploy();

//the eco coin contract is deployed at: 0x6B3E3F65E2AF09B8246A3f52F57aE68a9cB1A22A
// the eco coin sale contract is deployed at: 0x9310e9460e705fEAC3a632808ebc68B90d2048Dd
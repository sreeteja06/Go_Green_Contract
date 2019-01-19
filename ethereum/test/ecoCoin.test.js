// npm test ethereum/test/ecoCoin.test.js

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

let temp = require('../build/temp.json');
// const eco_coin_sale = require('../build/temp.json');
const eco_coin = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin"];
const eco_coin_sale = temp["contracts"]["ECO_Coin_Sale"]["Eco_Coin_Sale"];
let accounts;
let eco_coin_contract;
let eco_coin_sale_contract;

beforeEach( async()=>{
    accounts = await web3.eth.getAccounts();
    try{
        eco_coin_contract = await new web3.eth.Contract(eco_coin.abi)
            .deploy({data: "0x"+eco_coin["evm"]["bytecode"]["object"],arguments: ['2000']})
            .send({gas: '4500000', from :accounts[0]})
    }
    catch(e){
        console.log('e'+e);
    }
    try{
        eco_coin_sale_contract = await new web3.eth.Contract(eco_coin_sale.abi)
            .deploy({data: "0x"+eco_coin_sale["evm"]["bytecode"]["object"],arguments: [eco_coin_contract.options.address,1,2,1]})
            .send({gas: '4500000', from :accounts[0]})
    }
    catch(e){
        console.log('e'+e);
    }
})

describe("eco_coin", ()=>{
    it("deployes the two contracts",()=>{ 
        assert.ok(eco_coin_contract.options.address);
        assert.ok(eco_coin_sale_contract.options.address);
    });
    it("checks the balance", async()=>{
        balance = await eco_coin_contract.methods.balanceOf(accounts[0]).call();
        console.log(balance);
    })
})
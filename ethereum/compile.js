const fs = require('fs-extra');
const solc = require('solc');
const path = require('path');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

// const ecoCoinPath = path.resolve(__dirname,'contracts','ECO_Coin.sol');
const ecoCoinSalePath = path.resolve(__dirname,'contracts','ECO_Coin_Sale.sol');

// const Coinsource = fs.readFileSync(ecoCoinPath,'utf8');
const Salesource = fs.readFileSync(ecoCoinSalePath,'utf8');

const input = {
    language: "Solidity",
    sources:{
        // "ECO_Coin":{
        //     content: Coinsource
        // },
        "ECO_Coin_Sale":{
            content: Salesource
        }
    },
    settings:{
        outputSelection: {
            "*": {
                "*": [ "*" ]
            }
        }
    }
};

let output = JSON.stringify(JSON.parse(solc.compile(JSON.stringify(input))),null,2);

fs.ensureDir(buildPath);

output = JSON.parse(output);

// fs.writeFileSync(path.resolve(buildPath,"temp.json"),JSON.stringify(output, null, 2));

for( let contract in output.contracts["ECO_Coin_Sale"] ){
    fs.outputJSONSync(
        path.resolve(buildPath, contract+'.json'),
        output.contracts["ECO_Coin_Sale"][contract]
    );
}
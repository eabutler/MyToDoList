const path = require('path');
const fs = require('fs');
const solc = require('solc');

const myToDoListPath = path.resolve(__dirname, 'contracts', 'MyToDoList.sol');
const source = fs.readFileSync(myToDoListPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'MyToDoList.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  module.exports = 
    JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'MyToDoList.sol'
    ].MyToDoList;
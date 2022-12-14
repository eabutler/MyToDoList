require("dotenv").config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const web3 = new Web3(provider);

const deploy = async () => {
    try {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from accounts', accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Get stuff done today'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log(abi);
    console.log('contract deployed to ', result.options.address);
    provider.engine.stop();
    } catch (error){
        console.log(error);
    }
};
deploy();
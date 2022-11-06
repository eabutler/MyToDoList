const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let toDoList;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    //use one of those accounts to deploy the contract
    toDoList = await new web3.eth.Contract(abi)
    .deploy({ 
        data: evm.bytecode.object, 
        arguments: ['get stuff done today'] 
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('To Do List Contract', () => {
    it('deploys a contract', () => {
        assert.ok(toDoList.options.address);
    });

    it('has a default task', async () => {
        const task = await toDoList.methods.taskList(0).call();
        assert.equal('get stuff done today', task.taskContent);
    });

    it('Creates a new task', async () => {
        await toDoList.methods.addTask('go get food').send({
            from: accounts[0],
            gas: 1000000
        });
        const task = await toDoList.methods.taskList(1).call();
        assert.equal(2, task.id);
        assert.equal('go get food', task.taskContent);
    });

    it('marks tasks complete', async () => {
        await toDoList.methods.addTask('go get food').send({
            from: accounts[0],
            gas: 1000000
        });
        await toDoList.methods.markCompleted(1).send({
            from: accounts[0],
            gas: 1000000
        });
        const task = await toDoList.methods.taskList(1).call();
        assert.equal(true, task.completion);
        console.log(abi);
    })

});

const db = require("./db");

async function index(req,res){
    value = await db.getUsers();
    console.log(value)
    return res.send(value);
}

async function machineById(req,res){
    value = await db.getMachineById(req,res);
    return res.send(value);
}

async function createMachine(req,res){
    let response = await db.insertMachine(req,res);
    res.send(response);
}

async function deleteMachine(req,res){
    let response = await db.deleteMachine(req,res);
    res.send(response);
}

async function updateMachine(req,res){
    let response = await db.updateMachine(req,res);
    res.send(response);
}

module.exports = {
    index,
    createMachine,
    updateMachine,
    deleteMachine,
    machineById
};
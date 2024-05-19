const db = require("./db");
const auth = require("./auth");

async function index(req,res){
    value = await db.getUsers();
    console.log(value)
    return res.send(value);
}

async function loginService(req,res){
    value = await auth.login(req,res);
    return res.send();
}

async function verificationService(req,res){
    value = await auth.verify(req,res);
    return res.send();
}



// Machine Routes
async function allMachines(req,res){
    value = await db.getMachines(req,res);
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

// Task Routes

async function allTasks(req,res){
    value = await db.getTasks(req,res);
    return res.send(value);
}

async function taskById(req,res){
    value = await db.getTaskById(req,res);
    return res.send(value);
}

async function createTask(req,res){
    let response = await db.insertTask(req,res);
    res.send(response);
}

async function deleteTask(req,res){
    let response = await db.deleteTask(req,res);
    res.send(response);
}

async function updateTask(req,res){
    let response = await db.updateTask(req,res);
    res.send(response);
}

// User Routes
async function userById(req,res){
    value = await db.getUserById(req,res);
    return res.send(value);
}

async function createUser(req,res){
    let response = await db.createUser(req,res);
    res.send(response);
}

async function deleteUser(req,res){
    let response = await db.deleteUser(req,res);
    res.send(response);
}

async function updateUser(req,res){
    let response = await db.updateMachine(req,res);
    res.send(response);
}


module.exports = {
    index,
    allMachines,
    createMachine,
    updateMachine,
    deleteMachine,
    machineById,
    allTasks,
    taskById,
    createTask,
    deleteTask,
    updateTask,
    loginService,
    verificationService,
    userById,
    createUser,
    deleteUser,
    updateUser
};
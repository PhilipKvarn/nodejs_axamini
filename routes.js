const db = require("./db");
const auth = require("./auth");
const cookieParser = require('cookie-parser');

async function allUsers(req,res){
    value = await db.getUsers();

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
    if(value.length == 0){
        return res.status(400).send("Couldn't get Machine: " + value);
    }
    return res.send(value);
}

async function createMachine(req,res){
    let value = await db.insertMachine(req,res);
    /* console.log("value: " + value)
    console.log(value)
    if(value.length == 0){
        return res.status(400).send("Couldn't create machine");
    } */
    return res.send(value);
}

async function deleteMachine(req,res){
    let value = await db.deleteMachine(req,res);
    res.send(value);
}

async function updateMachine(req,res){
    let value = await db.updateMachine(req,res);
    res.send(value);
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
    let value = await db.insertTask(req,res);
    res.send(value);
}

async function deleteTask(req,res){
    let value = await db.deleteTask(req,res);
    res.send(value);
}

async function updateTask(req,res){
    let value = await db.updateTask(req,res);
    res.send(value);
}

// User Routes
async function userById(req,res){
    value = await db.getUserById(req,res);
    return res.send(value);
}

async function userByMail(req,res){
    value = await db.getUserByMail(req,res);
    return res.send(value)
}

async function createUser(req,res){
    let value = await db.createUser(req,res);
    res.send(value);
}

async function deleteUser(req,res){
    let value = await db.deleteUser(req,res);
    res.send(value);
}

async function updateUser(req,res){
    let value = await db.updateUser(req,res);
    res.send(value);
}


async function allSuggestions(req,res){
    value = await db.allSuggestions();
    return res.send(value);
}
async function createSuggestion(req,res){
    let value = await db.createSuggestion(req,res);
    res.send(value);
}
async function updateSuggestion(req,res){
    let value = await db.updateSuggestion(req,res);
    res.send(value);
}
async function deleteSuggestion(req,res){
    let value = await db.deleteSuggestion(req,res);
    res.send(value);
}


module.exports = {
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
    allUsers,
    userById,
    userByMail,
    createUser,
    deleteUser,
    updateUser,

    allSuggestions,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion
};
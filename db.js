const Pool = require('pg').Pool

const pool = new Pool({
    host:"localhost",
    user:"root",
    password:"root",
    database: 'axamini',
    port:5432,
})


// MACHINES

    async function getMachines(){
        //console.log("into users")
        const result = await pool.query('SELECT * FROM machines');
        value = result.rows
        return(value);
    }
    
    async function getMachineById(req,res){
        
        const id = parseInt(req.body.id)
        if(isNaN(id)){
            return "is: NaN"
        }
        const result = await pool.query('SELECT * FROM machines WHERE id = $1', [id]);
        
        return result.rows;
    }
    
    async function insertMachine(req,res){
        //const {name, status, urgency} = request.body
        console.log("INSERT")
        const {name, status, urgency} = req.body
        pool.query('INSERT INTO machines (name, status, urgency) VALUES ($1, $2, $3)', [name, status, urgency], (error, results)=>{
            if(error){
                return error
            }
            return "OK"
        })
    }
    
    async function updateMachine(req,res){
        //const {name, status, urgency} = request.body
        console.log("UPDATE")
        const id = req.body.id;
        const {name, status, urgency} = req.body
        pool.query('UPDATE machines SET name = $1, status = $2, urgency = $3 WHERE id = $4', [name, status, urgency, id], (error, results)=>{
            if(error){
                return error
            }
            return "OK"
        })
    }
    
    async function deleteMachine(req,res){
        console.log("DELETE")
        const id = req.body.id
        pool.query('DELETE FROM machines WHERE id = $1', [id], (error,results)=>{
            if(error){
                return error;
            }
            return "OK";
        })
    }

//TASKS

//USERS


async function getUsers(){
    //console.log("into users")
    const result = await pool.query('SELECT * FROM users');
    value = result.rows
    return(value);
}

async function getUserById(req,res){
    const id = parseInt(req.body.id)
        if(isNaN(id)){
            return "is: NaN"
        }
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]/* , (error, results)=>{
        if(error){
            console.log(error);
            return error
        }
        
        console.log("befr return")
        console.log(results.rows)
        return results
    } */);
    
    return result.rows
}

async function getUserByMail(req,res){
    const mail = req.body.mail;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [mail])
}

async function createUser(req,res){
    //const {name, status, urgency} = request.body
    const {name, telephone_number, email, role, company_name} = req.body
    pool.query('INSERT INTO users (name, telephone_number, email, role, company_name) VALUES ($1,$2,$3,$4,$5);', [name, telephone_number, email, role, company_name], (error)=>{
        if(error){
            return error
        }
    })
}

async function updateUser(req,res){
    //const {name, status, urgency} = request.body
    console.log("UPDATE")
    const id = req.body.id;
    const {name, status, urgency} = req.body
    pool.query('UPDATE users SET name = $1, telephone_number = $2, email = $3, role = $4, company_name = $5 WHERE id = $6', [name, telephone_number, email, role, company_name, id], (error)=>{
        if(error){
            return error
        }
    })
    
}

async function deleteUser(req,res){
    console.log("DELETE")
    const id = req.body.id
    pool.query('DELETE FROM machines WHERE id = $1', [id], (error,results)=>{
        if(error){
            return error;
        }
        return "OK";
    })
}



module.exports = {
    getMachines,
    insertMachine,
    deleteMachine,
    updateMachine,
    getMachineById,
    getUsers,
    getUserById,
    getUserByMail,
    createUser,
    updateUser,
    deleteUser
};
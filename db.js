const Pool = require('pg').Pool

const pool = new Pool({
    host:"localhost",
    user:"root",
    password:"root",
    database: 'axamini',
    port:5432,
})


// MACHINES

    async function getMachines(req,res){
        //console.log("into users")
        try {
            const result = await pool.query('SELECT * FROM machines');
            value = result.rows
            return(value);
        } catch (error) {
            return res.status = 500
        }
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
        console.log("INSERT MACHINE")
        const {name, status, urgency, mechanic_id} = req.body
        console.log(req.body)
        pool.query('INSERT INTO machines (name, status, urgency, mechanic_id) VALUES ($1, $2, $3, $4)', [name, status, urgency, mechanic_id], (error, results)=>{
            if(error){
                console.log(error)
                return error
            }
            return "OK"
        })
    }
    
    async function updateMachine(req,res){
        //const {name, status, urgency} = request.body
        console.log("UPDATE MACHINE")
        console.log(req.body)
        const id = req.body.id;
        const {name, status, urgency, mechanic_id} = req.body
        pool.query('UPDATE machines SET name = $1, status = $2, urgency = $3, mechanic_id = $4 WHERE id = $5', [name, status, urgency, mechanic_id, id], (error, results)=>{
            if(error){
                return error
            }
            return "OK"
        })
    }
    
    async function deleteMachine(req,res){
        console.log("DELETE MACHINE")
        const id = req.body.id
        pool.query('DELETE FROM machines WHERE id = $1', [id], (error,results)=>{
            if(error){
                return error;
            }
            return "OK";
        })
    }

//TASKS

async function getTasks(){
    //console.log("into users")
    const result = await pool.query('SELECT * FROM task');
    value = result.rows
    return(value);
}

async function getTaskById(req,res){
    
    const id = parseInt(req.body.id)
    if(isNaN(id)){
        return "is: NaN"
    }
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);
    
    return result.rows;
}

async function insertTask(req,res){
    //const {name, status, urgency} = request.body
    console.log("INSERT TASK")
    const {name, next_execution_date, interval_days, execution_time, machine_id, description} = req.body
    pool.query('INSERT INTO task (name, next_execution_date, interval_days, execution_time, machine_id, description) VALUES ($1, $2, $3, $4, $5, $6)', [name, next_execution_date, interval_days, execution_time, machine_id,description], (error, results)=>{
        if(error){
            console.log(error)
            return error
        }
        return "OK"
    })
}

async function updateTask(req,res){
    //const {name, status, urgency} = request.body
    console.log("UPDATE TASK")
    console.log(req.body)
    const id = req.body.id;
    const {name, next_execution_date, interval_days, execution_time, machine_id, description} = req.body
    pool.query('UPDATE task SET name = $1, next_execution_date = $2, interval_days=$3, execution_time = $4, machine_id=$5, description=$6 WHERE id = $7', [name, next_execution_date, interval_days, execution_time, machine_id,description, id], (error, results)=>{
        if(error){
            console.log(error)
            return error
        }
        return "OK"
    })
}

async function deleteTask(req,res){
    console.log("DELETE TASK")
    const id = req.body.id
    pool.query('DELETE FROM task WHERE id = $1', [id], (error,results)=>{
        if(error){
            return error;
        }
        return "OK";
    })
}

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
    const email = req.body.email;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    return result.rows
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
    console.log("UPDATE USER")
    const id = req.body.id;
    const {name, telephone_number, email, role, company_name} = req.body
    pool.query('UPDATE users SET name = $1, telephone_number = $2, email = $3, role = $4, company_name = $5 WHERE id = $6', [name, telephone_number, email, role, company_name, id], (error)=>{
        if(error){
            return error
        }
    })
    
}

async function deleteUser(req,res){
    console.log("DELETE USER")
    const id = req.body.id
    pool.query('DELETE FROM users WHERE id = $1', [id], (error,results)=>{
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
    getTasks,
    getTaskById,
    insertTask,
    updateTask,
    deleteTask,
    getUsers,
    getUserById,
    getUserByMail,
    createUser,
    updateUser,
    deleteUser
};
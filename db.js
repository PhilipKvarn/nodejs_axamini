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
        try {
            console.log("INSERT MACHINE")
            const {name, status, urgency, mechanic_id} = req.body
            const result = await pool.query('INSERT INTO machines (name, status, urgency, mechanic_id) VALUES ($1, $2, $3, $4) RETURNING *',[name, status, urgency, mechanic_id]);
            
            if (result.rows.length === 0) {
                throw new Error(`Machine not inserted`);
            }

            const insertedMachine = result.rows[0];
            console.log('Inserted machine:', insertedMachine);
            return insertedMachine;
        } catch (err) {
            console.error(err);
            res.status(400)
            return err;
        }
    }
    
    async function updateMachine(req,res){
        try {
            console.log("UPDATE MACHINE")
            const id = req.body.id;
            const {name, status, urgency, mechanic_id} = req.body
            const result = await pool.query('UPDATE machines SET name = $1, status = $2, urgency = $3, mechanic_id = $4 WHERE id = $5 RETURNING *',[name, status, urgency, mechanic_id, id]);
            
            if (result.rows.length === 0) {
                throw new Error(`Machine with ID ${id} not updated`);
            }

            const updatedMachine = result.rows[0];
            console.log('Updated machine:', updatedMachine);
        
            return updatedMachine;
        } catch (err) {
            console.error('Error updating machine:', err);
            res.status(400)
            return err;
        }
    }
    
    async function deleteMachine(req,res){
        try {
            console.log("DELETE MACHINE")
            const id = req.body.id
            const result = await pool.query('DELETE FROM machines WHERE id = $1 RETURNING *', [id]);

            if (result.rows.length === 0) {
                throw new Error(`Machine with ID ${id} not found`);
            }

            const deletedMachine = result.rows[0];
            console.log(deletedMachine);
            return deletedMachine;
        } catch (err) {
            console.error(err);
            res.status(400)
            return err;
        }
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
/*     console.log("INSERT TASK")
    const {name, next_execution_date, interval_days, execution_time, machine_id, description} = req.body
    pool.query('INSERT INTO task (name, next_execution_date, interval_days, execution_time, machine_id, description) VALUES ($1, $2, $3, $4, $5, $6)', [name, next_execution_date, interval_days, execution_time, machine_id,description], (error, results)=>{
        if(error){
            console.log(error)
            return error
        }
        return "OK"
    }) */

    try {
        console.log("INSERT TASK")
        const {name, next_execution_date, interval_days, execution_time, machine_id, description, completed} = req.body
        const result = await pool.query('INSERT INTO task (name, next_execution_date, interval_days, execution_time, machine_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, next_execution_date, interval_days, execution_time, machine_id,description,completed]);
        console.log(result)

        if (result.rows.length === 0) {
            throw new Error(`TASK not inserted`);
        }

        const insertedTask = result.rows[0];
        console.log(insertedTask);
        return insertedTask;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
}

async function updateTask(req,res){
    //const {name, status, urgency} = request.body
    /* console.log("UPDATE TASK")
    console.log(req.body)
    const id = req.body.id;
    const {name, next_execution_date, interval_days, execution_time, machine_id, description} = req.body
    pool.query('UPDATE task SET name = $1, next_execution_date = $2, interval_days=$3, execution_time = $4, machine_id=$5, description=$6 WHERE id = $7', [name, next_execution_date, interval_days, execution_time, machine_id,description, id], (error, results)=>{
        if(error){
            console.log(error)
            return error
        }
        return "OK"
    }) */

    try {
        console.log("UPDATE TASK")
        const id = req.body.id;
        const {name, next_execution_date, interval_days, execution_time, machine_id, description, completed} = req.body
        const result = await pool.query('UPDATE task SET name = $1, next_execution_date = $2, interval_days=$3, execution_time = $4, machine_id=$5, description=$6, completed = $7 WHERE id = $8 RETURNING *', [name, next_execution_date, interval_days, execution_time, machine_id,description,completed, id]);
        
        if (result.rows.length === 0) {
            throw new Error(`TASK with ID ${id} not updated`);
        }

        const updatedTask = result.rows[0];
        console.log('Updated TASK:', updatedTask);
    
        return updatedTask;
    } catch (err) {
        console.error('Error updating TASK:', err);
        res.status(400)
        return err;
    }
}

async function deleteTask(req,res){
/*     console.log("DELETE TASK")
    const id = req.body.id
    pool.query('DELETE FROM task WHERE id = $1 ', [id], (error,results)=>{
        if(error){
            return error;
        }
        return "OK";
    }) */

    try {
        console.log("DELETE TASK")
        const id = req.body.id
        const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            throw new Error(`TASK with ID ${id} not found`);
        }

        const deletedTask = result.rows[0];
        console.log(deletedTask);
        return deletedTask;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
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
    
    value = await getUserByMail(req,res);

    if(value.length != 0){
        res.status(400).send("User already exists user")
        return
    }

    /* const {name, telephone_number, email, role, company_name} = req.body
    pool.query('INSERT INTO users (name, telephone_number, email, role, company_name) VALUES ($1,$2,$3,$4,$5);', [name, telephone_number, email, role, company_name], (error)=>{
        if(error){
            return error
        }
    }) */

    try {
        console.log("INSERT USER")
        const {name, telephone_number, email, role, company_name} = req.body
        const result = await pool.query('INSERT INTO users (name, telephone_number, email, role, company_name) VALUES ($1,$2,$3,$4,$5) RETURNING *', [name, telephone_number, email, role, company_name]);
        console.log(result)

        if (result.rows.length === 0) {
            throw new Error(`USER not inserted`);
        }

        const insertedUser = result.rows[0];
        console.log(insertedUser);
        return insertedUser;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
}

async function updateUser(req,res){
    
    value = await getUserByMail(req,res);

    if(value.length != 0){
        res.status(400).send("User already exists user")
        return
    }

    /* console.log("UPDATE USER")
    const id = req.body.id;
    const {name, telephone_number, email, role, company_name} = req.body
    pool.query('UPDATE users SET name = $1, telephone_number = $2, email = $3, role = $4, company_name = $5 WHERE id = $6', [name, telephone_number, email, role, company_name, id], (error)=>{
        if(error){
            return error
        }
    }) */

    try {
        console.log("UPDATE USER")
        const id = req.body.id;
        const {name, telephone_number, email, role, company_name} = req.body
        const result = await pool.query('UPDATE users SET name = $1, telephone_number = $2, email = $3, role = $4, company_name = $5 WHERE id = $6 RETURNING *', [name, telephone_number, email, role, company_name, id]);
        
        if (result.rows.length === 0) {
            throw new Error(`USER with ID ${id} not updated`);
        }

        const updatedUser = result.rows[0];
        console.log('Updated USER:', updatedUser);
        return updatedUser;
    } catch (err) {
        console.error('Error updating USER:', err);
        res.status(400)
        return err;
    }
    
}

async function deleteUser(req,res){
/*     console.log("DELETE USER")
    const id = req.body.id
    pool.query('DELETE FROM users WHERE id = $1', [id], (error,results)=>{
        if(error){
            return error;
        }
        return "OK";
    }) */

    try {
        console.log("DELETE USER")
        const id = req.body.id
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            throw new Error(`USER with ID ${id} not found`);
        }

        const deletedUser = result.rows[0];
        console.log(deletedUser);
        return deletedUser;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
}


async function allSuggestions(){
    const result = await pool.query('SELECT * FROM suggestions');
    value = result.rows
    return(value);
}

async function createSuggestion(req,res){
/*     const {name, creator_id, machine_id, description} = req.body
    pool.query('INSERT INTO suggestions (name, creator_id, machine_id, description) VALUES ($1,$2,$3,$4);', [name, creator_id, machine_id, description], (error)=>{
        if(error){
            return error
        }
    }) */

    try {
        console.log("INSERT SUGGESTION")
        const {name, creator_id, machine_id, description} = req.body
        const result = await pool.query('INSERT INTO suggestions (name, creator_id, machine_id, description) VALUES ($1,$2,$3,$4) RETURNING *', [name, creator_id, machine_id, description]);
        console.log(result)

        if (result.rows.length === 0) {
            throw new Error(`SUGGESTION not inserted`);
        }

        const insertedSuggestion = result.rows[0];
        console.log(insertedSuggestion);
        return insertedSuggestion;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
}

async function updateSuggestion(req,res){
    //const {name, status, urgency} = request.body
/*     console.log("UPDATE SUGGESTION")
    const id = req.body.id;
    const {name, creator_id, machine_id, description} = req.body
    pool.query('UPDATE suggestions SET name = $1, creator_id = $2, machine_id = $3, description = $4 WHERE id = $5', [name, creator_id, machine_id, description, id], (error)=>{
        if(error){
            return error
        }
    })
 */
    try {
        console.log("UPDATE SUGGESTION")
        const id = req.body.id;
        const {name, creator_id, machine_id, description} = req.body
        const result = await pool.query('UPDATE suggestions SET name = $1, creator_id = $2, machine_id = $3, description = $4 WHERE id = $5 RETURNING *', [name, creator_id, machine_id, description, id]);
        
        if (result.rows.length === 0) {
            throw new Error(`SUGGESTION with ID ${id} not updated`);
        }

        const updatedSuggestion = result.rows[0];
        console.log('Updated SUGGESTION:', updatedSuggestion);
        return updatedSuggestion;
    } catch (err) {
        console.error('Error updating SUGGESTION:', err);
        res.status(400)
        return err;
    }
    
}

async function deleteSuggestion(req,res){
/*     console.log("DELETE SUGGESTION")
    const id = req.body.id
    pool.query('DELETE FROM suggestions WHERE id = $1', [id], (error,results)=>{
        if(error){
            return error;
        }
        return "OK";
    }) */

    try {
        console.log("DELETE SUGGESTION")
    const id = req.body.id
        const result = await pool.query('DELETE FROM suggestions WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            throw new Error(`SUGGESTION with ID ${id} not found`);
        }

        const deletedSuggestion = result.rows[0];
        console.log(deletedSuggestion);
        return deletedSuggestion;
    } catch (err) {
        console.error(err);
        res.status(400)
        return err;
    }
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
    deleteUser,

    allSuggestions,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion
};
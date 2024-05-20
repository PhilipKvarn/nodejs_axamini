const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


const routes = require("./routes");
const { auth, isAdmin } = require("./mw");

const app = express();

app.listen(1738);

app.use(cookieParser());
/* app.use(cors()); */
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));


/* app.get("/", routes.index); */

app.post("/login", routes.loginService)
app.post("/verify", routes.verificationService)
app.post("/loggedin",auth,(req,res)=>{
    res.json({"loggedin":true}).status(200);
})
app.post("/admin",isAdmin,(req,res)=>{
    res.json({"admin":true}).status(200)
})

//Machine Routes
app.get("/machines", routes.allMachines)
app.get("/machine", routes.machineById);
app.post("/machine", auth, routes.createMachine);
app.put("/machine",auth, routes.updateMachine);
app.delete("/machine",auth, routes.deleteMachine);

//Task Routes
app.get("/tasks", routes.allTasks)
app.get("/task", routes.taskById);
app.post("/task",auth, routes.createTask);
app.put("/task",auth, routes.updateTask);
app.delete("/task",auth, routes.deleteTask);

//User Routes

app.get("/users", routes.allUsers)
app.get("/user", routes.userById);
app.get("/email", routes.userByMail);
app.post("/user",isAdmin, routes.createUser);
app.put("/user",isAdmin, routes.updateUser);
app.delete("/user",isAdmin, routes.deleteUser);
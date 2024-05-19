const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require("./routes");
const { auth } = require("./mw");

const app = express();

app.listen(1738);

app.use(cors());
app.use(express.json());
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));


/* app.get("/", routes.index); */

app.post("/login", routes.loginService)
app.post("/verify", routes.verificationService)


//Machine Routes
app.get("/machines", routes.allMachines)
app.get("/machine", routes.machineById);
app.post("/machine", auth, routes.createMachine);
app.put("/machine", routes.updateMachine);
app.delete("/machine", routes.deleteMachine);

//Task Routes
app.get("/tasks", routes.allTasks)
app.get("/task", routes.taskById);
app.post("/task", routes.createTask);
app.put("/task", routes.updateTask);
app.delete("/task", routes.deleteTask);

//User Routes

app.get("/users", routes.allUsers)
app.get("/user", routes.userById);
app.post("/user", routes.createUser);
app.put("/user", routes.updateUser);
app.delete("/user", routes.deleteUser);
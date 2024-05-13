const express = require("express")
const bodyParser = require('body-parser')

const routes = require("./routes");
const { auth } = require("./mw");

const app = express();

app.listen(1738);


app.use(express.json());
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", routes.index);

app.post("/login", routes.loginService)
app.post("/verify", routes.verificationService)


//Machine Routes
app.get("/machine", routes.machineById);
app.post("/machines", auth, routes.createMachine);
app.put("/machines", routes.updateMachine);
app.delete("/machines", routes.deleteMachine);

//Task Routes
app.get("/tasks", routes.taskById);
app.post("/tasks", routes.createTask);
app.put("/tasks", routes.updateTask);
app.delete("/tasks", routes.deleteTask);

//User Routes

app.get("/users", routes.userById);
app.post("/users", routes.createUser);
app.put("/users", routes.updateUser);
app.delete("/users", routes.deleteUser);
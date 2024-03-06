const express = require("express")
const bodyParser = require('body-parser')
const routes = require("./routes");

const app = express();

app.listen(1738);


app.use(express.json());
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));

app.post("/machines", routes.createMachine);
app.get("/", routes.index);
app.get("/machine", routes.machineById);
app.put("/machines", routes.updateMachine);
app.delete("/machines", routes.deleteMachine);


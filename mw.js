const jwt = require("jsonwebtoken");
//const cookieParser = require('cookie-parser');
const {getMachines} = require("./db");


module.exports = {auth}

async function auth(req,res,next){
    let {token} = req.body;

    try{
        token = await jwt.verify(token, 'secret');
        let user = {email: token.email, role:token.role}
        req.user = user;
        next();
    } catch (error){
        if(!token){res.send("Not logged in");}
        else{res.send(error);}
    }

}


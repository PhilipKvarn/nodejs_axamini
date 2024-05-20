const jwt = require("jsonwebtoken");
//const cookieParser = require('cookie-parser');
const {getMachines} = require("./db");


module.exports = {auth}

async function auth(req,res,next){
    let authToken = req.cookies['auth-token'];
    
    try{
        token = await jwt.verify(authToken, 'secret');
        let user = {email: token.email, role:token.role}
        req.user = user;
        next();
    } catch (error){
            res.status = 400
            res.send("Not logged in");
    }

}


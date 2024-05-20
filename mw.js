const jwt = require("jsonwebtoken");
//const cookieParser = require('cookie-parser');
const db = require("./db");

module.exports = {auth, isAdmin}

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

async function isAdmin(req,res,next){
    let authToken = req.cookies['auth-token'];
    
    try{
        token = await jwt.verify(authToken, 'secret');
        req.body.email = token.email
        let val = await db.getUserByMail(req,res);
        if(val[0].role != "admin"){
            throw error
        }
        next();
    } catch (error){
            res.status = 400
            res.send("Not Admin");
    }
}


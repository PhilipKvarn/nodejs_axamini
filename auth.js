const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const db = require("./db");

function isAdmin(req,res,next){
    if(req.user && req.user.role == 'admin'){
        return next();
    }
    else{
        return res.status(402).json({message:'permission denied'});
    }
}

async function login(req, res){
    console.log("tried to login:")
    console.log(req.body)
    console.log("end to login:")
    value = await db.getUserByMail(req,res);

    if(value.length == 0){
        res.send("No such user")
        return
    }

    let email = req.body.email;
    let code = uniqid();
    console.log(code);

    let hash = await bcrypt.hash(code, 12);
    // Byt secret senare
    let token = await jwt.sign({email, hash},'secret', {expiresIn:120});
    res.cookie('token',token,{httpOnly: true, samesite});
    return ;
    //res.json(token);  // för postman

}

async function verify(req, res){

    let {code} = req.body;
    console.log("cookie:")
    console.log(req.cookies['token'])
    if(req.cookies.token === undefined){
        return res.send("no cookie");
    }
    
    let token = req.cookies.token;

    console.log("token");
    console.log(token);

    try {
        let checkedToken = await jwt.verify(token,'secret');
        console.log("checkedToken", checkedToken);

        let hash = checkedToken.hash;

        let checkPassword = await bcrypt.compare(code, hash);
        console.log("checkPassword", checkPassword);
        if(checkPassword){
            let payload = {
                email:checkedToken.email,
                role:"pwl-user"
            }
            let authToken = await jwt.sign(payload, 'secret',{
                expiresIn:"3h"
            });
            res.cookie("auth-token",authToken,{
              httpOnly:true  
            })
            return res.json(authToken);
        }
        return res.json({error:"Wrong Code"});

    } catch (error) {
        return res.json(error);
    }


}

module.exports={login, verify}
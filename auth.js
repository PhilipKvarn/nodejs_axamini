const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");

function isAdmin(req,res,next){
    if(req.user && req.user.role == 'admin'){
        return next();
    }
    else{
        return res.status(402).json({message:'permission denied'});
    }
}

async function login(req, res){

    let email = req.body.email;
    let code = uniqid();
    console.log(code);

    let hash = await bcrypt.hash(code, 12);
    // Byt secret senare
    let token = await jwt.sign({email, hash},'secret', {expiresIn:120});
    
    res.cookie("token",token,{
        maxAge:60000
    });

    //return res.redirect("/verify");
    res.json(token);  // för postman

}

async function verify(req, res){

    let {code} = req.body;

    console.log(req.cookie);

    let {token} = req.body;

    // Verifiera token
    try {
        // Byt secret senare
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
            // Byt secret senare
            let authToken = await jwt.sign(payload, 'secret',{
                expiresIn:"3h"
            });
            res.cookie("auth-token",authToken,{
              httpOnly:true  
            })
            return res.json(authToken);
            //return res.redirect("/?loggedIn");
        }
        return res.json({error:"Wrong Code"});

    } catch (error) {
        //console.log("error",error);
        return res.json(error);
    }
/*     res.json({code, token}); */

}

module.exports={login, verify}
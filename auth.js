const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

function isAdmin(req,res,next){
    if(req.user && req.user.role == 'admin'){
        return next();
    }
    else{
        return res.status(402).json({message:'permission denied'});
    }
}


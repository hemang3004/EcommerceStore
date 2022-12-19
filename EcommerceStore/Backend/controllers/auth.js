const User = require("../modules/user")
const expjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config()
// const errors = require("formidable/FormidableError");

// user signout
exports.signout = (req, res) => {
    res.clearCookie("token");
     res.json({
        message:"User signout!!!"
    })
}

// user signup
exports.signup = (req, res) => {
    
    const errors = validationResult(req); //all errors during signup period
    if (!errors.isEmpty()) {
        // checking untill all errors of the signup are gone
        return res.status(422).json({
            // sending the errors back to signup page
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body); // crreating a temp user to store in db
    user.save((err, user) => {
        if (err) {
            // console.log(err);
            return res.status(400).json({
                //this error can occur if already signedup user, signs up again
                err: "NOT ABLE TO SAVE this"
            });
        }
        res.json(user);
    })

}

exports.signin = (req, res) => {
    // collecting errors during signing in
    const errors = validationResult(req);
    // destructuring as authentication only required password & email  
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    // finding the very first user present in db and retriving it 
    User.findOne({email}, (err, user) => {
        // if theres any error or theres no such user
        if (err || !user) {
            
            return res.status(400).json({
                error: "Email dosen't exist"
            })
        }
        if (!user.authenticate(password)) {
            // if password is incorrect
            return res.status(400).json({
                error: "Password is incorrect"
            })
        }
        // creating token
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        // putting token in cookies
        res.cookie("token",token,{expire: new Date()+9999})
        
        // sending response to frontend
        const{ _id,name,email,role}=user;
        // to know user is loggedin
        return res.json({token,user:{
            _id,name,email,role
        }});
    })
};
// protected route
exports.isSignedin=expjwt({
    secret: process.env.SECRET,
    userProperty:"auth",
    algorithms:['HS256']
});
exports.isAuthenticated= (req,res,next) =>{
    var check=req.profile && req.auth && req.auth._id == req.profile._id
    if(!check){
        return res.status(403).json({
            error:"Acccess Denied"
        });
    }
    next();
}

exports.isAdmin= (req,res,next) =>{
    if(req.profile.role==0)
    {
        return res.status(403).json({
            error:"No admin, No party!"
        })
    }
    next();
}
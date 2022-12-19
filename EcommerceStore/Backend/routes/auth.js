var express=require("express");
var router=express.Router();
const { check, validationResult } = require('express-validator');
const {signout,signup,signin,isSignedin}=require("../controllers/auth")

router.get("/signout",signout);
router.post("/signup",
    check("email","email is required").isEmail(),
    check('password').isLength({
        min:8,
    }).withMessage('must be at least 8 chars long'),
check("password").isUppercase().withMessage("keep 1st letter captital") ,signup);

router.post("/signin",
    check("email","email is required").isEmail(),
    check('password').isLength({min:8}),signin);


router.get("/testroute",isSignedin,(req,res)=>{
    console.log(req.auth);
    res.send(req.auth);
});
module.exports=router;
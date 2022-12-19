const express=require("express");
const router=express.Router();
const {isAuthenticated,isSignedin}=require("../controllers/auth");
const { processPayment , getToken} = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");
// getUserById

router.param("userId",getUserById);


router.get("/payment/gettoken/:userId",isSignedin,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedin,isAuthenticated,processPayment)

module.exports=router;
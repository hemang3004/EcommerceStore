const User = require("../modules/user");
const express=require("express");
const router=express.Router();

const {getUser,getUserById/*,getAllUsers*/,updateUser,userPurchaseList}=require("../controllers/user")
const {isSignedin,isAdmin,isAuthenticated}=require("../controllers/auth")

router.param("userId",getUserById);
router.get("/user/:userId",isSignedin,isAuthenticated,getUser);
router.put("/user/:userId",isSignedin,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedin,isAuthenticated,userPurchaseList)
// router.get("/users",getAllUsers);
module.exports = router;
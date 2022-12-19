const express=require("express");
const router=express.Router();


const {isSignedin,isAuthenticated,isAdmin}=require("../controllers/auth");
const{getUserById,pushOrderinPurchaselist}=require("../controllers/user");
const{updateStock}=require("../controllers/product");
const{getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus}=require("../controllers/order");
const { Router } = require("express");

router.param("userId",getUserById);
router.param("orderId",getOrderById);

router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderinPurchaselist,updateStock,createOrder);
router.get("/order/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders)

router.get("/order/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus)



module.exports=router;
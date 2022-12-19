const express=require("express");
const router=express.Router();

const {isSignedin,isAuthenticated,isAdmin}=require("../controllers/auth");
const{getUserById}=require("../controllers/user");
const{getProductById,createProduct, getProduct,photo,removeProduct,updateProduct, getAllProducts, getAllUniqueategories}=require("../controllers/product.js");

router.param("userId",getUserById);
router.param("productId",getProductById);

router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProduct);
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);
router.get("/products/categories",getAllUniqueategories);

// update&deleted
router.delete("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,removeProduct);
router.put("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,updateProduct);
router.get("/products",getAllProducts)
module.exports=router;
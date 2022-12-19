// https://codeshare.io/78l3Wb

const mongoose = require('mongoose');
const express = require('express');
const bodyparser=require("body-parser");
const cors=require("cors");
const cookieparser=require("cookie-parser");
const app=express();
// my routes
const userRoutes=require("./routes/user")
const authRoutes=require("./routes/auth");
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const orderRoutes=require("./routes/order")
const paymentBRoutes=require("./routes/payment")



require('dotenv').config()

// db connection
mongoose.connect(process.env.DATABASE,
{ useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    .then(()=>{console.log("DBCONNNNECTED");})
    .catch(err=>{console.log(err)})

const port = 5000;
// middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());

// routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentBRoutes);

app.get('/',(req,res)=>{
    console.log("hello");
    return res.send('Herloo');
})

app.listen(port,()=>{
    console.log(`App is running  ...`)
})
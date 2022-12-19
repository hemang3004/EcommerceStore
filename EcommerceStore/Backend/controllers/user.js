const User = require("../modules/user");
const Order =require("../modules/order");


exports.getUserById= (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error :"No user in dbs"
            });
        }
        req.profile=user;
        next();
    })
 }
exports.getUser= (req,res)=>{
    req.profile.salt=undefined
    req.profile.enc_password=undefined
    return res.json(req.profile);
}
// exports.getAllUsers = (req,res)=>{
//  User.find().exec((err,users)=>{
//      if(err || !users){
//          return res.status(400).json({
//              error:"no users"
//          })
//         }
//         const arr=[];
//         users.forEach(ele=>{
//             arr.push({
//                 "name":ele.name,
//                 "email":ele.email
//             })
//         })
//         return res.json({users:arr})
//     })
// }
exports.updateUser =(req,res)=>{
    // req.profile is the data present in data base and is fetched using id
    console.log(req.profile)
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                
                return res.status(400).json({
                    error:"Update failed"
                })
            }
            user.salt=undefined
            user.enc_password=undefined
            res.json(user);
        }
    )
}
exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    // populate for cross connection
    .exec((err,order)=>{
        if(err || !order){
        return res.status(400).json({
            error:"No order in this account"
        })
        }
        return res.json.json(order)
    })
};
exports.pushOrderinPurchaselist=(req,res,next)=>{
    let current_purchases =[]
    req.body.order.products.forEach(item =>{
        current_purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
    });
// store db
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:current_purchases}},
        {new:true},//flag to send the updated obj not the old one 
        (err,purchases)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save  purcchAse list"
                })
            }
        next();
        }
    )    
}
const fmd=require("formidable");
const ld=require("lodash")
const Product =require("../modules/product");
const files=require("fs")

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id).populate("category").exec((err,product)=>{
        if(err){
            return res.status.json({
                error:"Product not avaliable"
            })
        }
        req.product=product;
        next();
    })
}
exports.createProduct=(req,res)=>{
    
    let form = new fmd.IncomingForm();
    form.keepExtension=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({
                error:"Image problem"
            });
        }
        const{price,description,category,stock,name}=fields;

        // destructure field
        // console.log(file.photo)
        if(!name||!price||!description||!category||!stock){
            return res.json({
                error:"Please include all fields"
            })
        }
        // restriction on fields
        let product=new Product(fields)

        // handle file
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }
            
            product.photo.data=files.readFileSync(file.photo.filepath);
            product.photo.contentType=file.photo.mimetype

            // console.log(product)
        }
        product.save((err,product)=>{
            if(err){
                // console.log(err);  
               return res.status(400).json({
                    error:"Saving in db failed"
                })
            }
            return res.json(product);
        })
    })
}
exports.getProduct=(req,res)=>{
    req.product.photo=undefined 
    return res.json(req.product)
}
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
    next();
}
exports.removeProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.json({
                error:"Unable to remove"
            })
        }
        res.json({
            message:"Deleted Product"
        })
    })
}
exports.updateProduct=(req,res)=>{
    let form = new fmd.IncomingForm();
    form.keepExtension=true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.json({
                error:"Image problem"
            });
        }
        console.log(file.photo)
        // const{price,description,category,stock,name}=fields;

        // destructure field
        // if(!name||!price||!description||!category||!stock){
        //     return res.json({
        //         error:"Please include all fields"
        //     })
        // }
        // restriction on fields
        let product=req.product
        product=ld.extend(product,fields)

        // handle file
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }
            
            product.photo.data=files.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type
            console.log(product)
        }
        product.save((err,product)=>{
            if(err){
               return res.status(400).json({
                    error:"Updation in db failed"
                })
            }
            return res.json(product);
        })
    })
}
exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit): 8
    let sortBy=req.query.sortBy ? req.query.sortBy: "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No products"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueategories=(req,res)=>{

    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            })
        }
        res.json(category);
    })
}

exports.updateStock=(req,res)=>{
    let myOperations= req.body.order.products.map(item=>{
        return{
            updateOne:{
                filter:{_id: item._id},
                update:{$inc:{stock:-item.count,sold:+item.count}}
            }
        }
    });
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            res.json({
                error:"Bulkinig failed"
            })
        }
    })
    next();

}

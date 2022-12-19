const Category = require("../modules/category")
// create controllers
exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category Unavaliable"
            });
        }
        req.category=cate;
        next();
    })
};

exports.createCategory=(req,res)=>{
    const category= new Category(req.body);
    category.save((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error:"Not able to save it"
            });
        }
        res.json({category});
    })
}
// read controller
exports.getAllCategory=(req,res)=>{
    // console.log("hello")
    Category.find().exec((err,categories)=>{
             if(err ){
                 return res.status(400).json({
                     error:"no users"
                 })
                }
                return res.json(categories)
            })
}


exports.getCategory=(req,res)=>{
    // 
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No categories found"
            });
        }
        res.json(categories);
    })
}
// update controllers
exports.updateCategory=(req,res)=>{
    // comes from db
    const category= req.category;
    // comes from  req 
    category.name=req.body.name
    category.save((err,updatedCategory)=>{
        if(err || !updatedCategory){
            return res.status(400).json({
                error:"Not able to save it"
            });
        }
        res.json(updatedCategory);
    })
}
exports.deleteCategory=(req,res)=>{
    // 
    const category=req.category
    category.remove((err,removedCategory)=>{
        if(err || !removedCategory){
            return res.status(400).json({
                error:"Not able to remove it" 
        });        
    }
    res.json({
        message:"REMOVED"+ {removedCategory}
    })
    })
}

const moongose=require("mongoose")

const categorySchema=new moongose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:24
    }
},{timestamps:true});
module.exports =moongose.model("Category",categorySchema)

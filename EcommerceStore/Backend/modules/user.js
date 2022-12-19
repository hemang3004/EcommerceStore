const moongose = require("mongoose");
const crypto= require("crypto");
const { v4: uuidv4 } = require('uuid');
var userSchema = new moongose.Schema({
    name:{
        type:String,
        maxlength:32,
        required:true,
        trim : true

    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        trim: true,
        maxlength:32,
    },
    enc_password:{
        type:String,
    },
    salt:String,
    purchases:{
        type: Array,
        defalut:[]
    },
    role:{
        type:Number,
        default:0
    },
    userinfo:{
        type:String,
        trim:true
    }
},{timestamps:true}) 
userSchema.methods= {
    securePassword: function(plainPassword)
    {
        if(!plainPassword)
        {
            // console.log("no pp")
             return "";}
        try{
            give_in_update=plainPassword; 
            return_pass= crypto.createHmac('sha256', this.salt)
                   .update(give_in_update)
                   .digest('hex');
            return return_pass
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plainpassword)
    {
        return this.securePassword(plainpassword)===this.enc_password
    }
}
userSchema.virtual("password")
        .set(function(password)
        {
            this._password =password;
            this.salt=uuidv4();
            // console.log("Here in setter");
            this.enc_password=this.securePassword(password);
            // console.log(this.enc_password)
        })
        .get(function()
        {
            return this._password;
        })

// console.log(userSchema);
module.exports=moongose.model("User",userSchema);
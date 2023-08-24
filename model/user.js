const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 name:{type:String,required:true},
 avatar:{type:String,required:true},
email:{type:String,required:true},
pass:{type:String,required:true},
},{
    versionKey:false
})


const UserModel= mongoose.model("user",userSchema)

module.exports={
    UserModel
}
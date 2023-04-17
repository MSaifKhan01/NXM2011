const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
name:String,
email:String,
password:String,
role:{type:String,default:"User",enum:["User","Moderator"]}
},{
    versionKey:false
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}
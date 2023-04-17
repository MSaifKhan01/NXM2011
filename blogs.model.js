const mongoose=require("mongoose")

const blogsSchema=mongoose.Schema({
title:String,
Sub:String,
body:String

},{
    versionKey:false
})

const blogsModel=mongoose.model("blogs",blogsSchema)

module.exports={blogsModel}
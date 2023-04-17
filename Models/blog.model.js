const mongoose=require('mongoose')


const blogSchema=mongoose.Schema({
    title:String,
    sub:String,
    body:String,
})

const blogModel=mongoose.model("blog",blogSchema)


module.exports=blogModel
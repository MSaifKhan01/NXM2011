const mongoose=require("mongoose")

const BlackListSchema=mongoose.Schema({
token:String
},{
    versionKey:false
})

const BlackListModel=mongoose.model("BlackList",BlackListSchema)

module.exports={BlackListModel}
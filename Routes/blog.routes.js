const express=require("express")
const { RolePermit } = require("../Middleware/role")
const blogModel = require("../Models/blog.model")

const blogRouter=express.Router()


blogRouter.get("/get",RolePermit(["User"]),async(req,res)=>{
    try {
            const data = await blogModel.find()
            res.status(201).send(data)
     
    } catch (error) {
        res.status(401).send({ "msg": error.message })
    }
})

blogRouter.post("/post",RolePermit(["User"]),async(req,res)=>{

    try {
        let data = new blogModel(req.body)
        await data.save()
        res.status(201).send({ "msg": "Post Added Succesfully" })

    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
    // res.send("Welcome to creat a post")
})

blogRouter.patch("/update/:Id",RolePermit(["User"]),async(req,res)=>{


    let { Id } = req.params
    const data = req.body
    try {
        await blogModel.findByIdAndUpdate({ _id: Id }, data)
        res.status(201).send({ "msg": "Post Updated Succesfully" })

    } catch (error) {
        res.status(201).send({ "msg": "error while Updating  the post" })

    }
    // res.send("Welcome to update a post")
})

blogRouter.delete("/delete/:Id",RolePermit(["User","Moderator"]),async(req,res)=>{


    let { Id } = req.params

    try {
        await blogModel.findByIdAndDelete({ _id: Id })
        res.status(201).send({ "msg": "Post Deleted Succesfully" })

    } catch (error) {
        res.status(201).send({ "msg": "error while deleting the post" })

    }
    // res.send("Welcome to delete a post")
})

module.exports={blogRouter}
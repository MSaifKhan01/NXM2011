const express=require("express")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { userModel } = require("../Models/user.model")
const { BlackListModel } = require("../Models/blacklist.model")


const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,role}=req.body

    try {
        const isAlready= await userModel.findOne({email})
        if(isAlready){
            return res.send({msg:"Already present plz login"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new userModel({name,email,password:hash,role})
            await user.save()
            res.status(200).send({msg:"signup succesfull"})
        })
    } catch (err) {
        res.status(401).send({msg:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    const accessToken=jwt.sign({email,role:user.role},"msd",{expiresIn:"1m"})
                    const refreshToken=jwt.sign({email,role:user.role},"srk",{expiresIn:"3m"})
                    res.cookie("accessToken",accessToken,{
                        maxAge:1000*60*3
                    })
                    res.cookie("refreshToken",refreshToken,{
                        maxAge:1000*60*5
                    })
                    res.status(200).send({msg:"login succesfull",accessToken,refreshToken})
                }else{
                    res.status(404).send({msg:"wrong credential",})
                }
            })
        }else{
            res.status(404).send({msg:"No Userr Found"})
        }
    } catch (err) {
        res.status(401).send({msg:err.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const accessToken=req.cookies.accessToken
    const refreshToken=req.cookies.refreshToken

    const accessTokenBlack= new BlackListModel({token:accessToken})

    const refreshTokenBlack= new BlackListModel({token:refreshToken})
    await accessTokenBlack.save()
    await refreshTokenBlack.save()
    res.status(200).send({msg:"logout succesfull"})
})

module.exports={userRouter}
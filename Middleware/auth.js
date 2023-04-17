const express=require("express")

const jwt=require("jsonwebtoken")
const { BlackListModel } = require("../Models/blacklist.model")


const auth=async(req,res,next)=>{
    const token=req.cookies.accessToken

    if(token){
        const isBlackList= await BlackListModel.findOne({token})
        if(isBlackList){
            res.status(404).send({msg:"Login agian...1"})
        }
        jwt.verify(token,"msd",async function (err, decoded){
            if(err){
                if(err.message=="jwt expired"){
                    const refreshToken1=req.cookies.refreshToken
                    const isBlackList= await BlackListModel.findOne({token:refreshToken1})
                    console.log(refreshToken1)
                    if(isBlackList){
                        res.status(404).send({msg:"Login agian.....2"})
                    }

                    
                    if(refreshToken1){
                        jwt.verify(refreshToken1,"srk", function(err,decoded){
                            if(decoded){
                                const newAccesToken=jwt.sign({email:decoded.email,role:decoded.role},"msd",{expiresIn:"1m"})
                                res.cookie("accessToken",newAccesToken,{
                                    maxAge:1000*60*3
                                })
                                req.role=decoded.role
                                next()
                            }
                            else{
                                res.status(404).send({msg:"Login agian....3"})
                            }
                        })
                    }else{
                        res.status(404).send({msg:"Login agian......4"})
                    }
                }
            }else{
                req.role=decoded.role
                next()
            }
        })
    }else{
        res.status(401).send({msg:"Login first"})
    }
}

module.exports={auth}
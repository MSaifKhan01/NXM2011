
function RolePermit(arr){
    return (req,res,next)=>{
        if(arr.includes(req.role)){
            next()
        }else{
            res.status(404).send({msg:"Note authrozied"})
        }
    }
}

module.exports={RolePermit}
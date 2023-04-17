const express=require("express")
const { connection } = require("./config/db")
const cookieP=require("cookie-parser")
const { auth } = require("./Middleware/auth")
const { userRouter } = require("./Routes/user.routes")
const { blogRouter } = require("./Routes/blog.routes")

const app=express()
app.use(express.json())
app.use(cookieP())

app.use("/user",userRouter)

app.use("/blog",auth,blogRouter)
// app.use("/user",auth,)

app.listen(8080,async()=>{
    await connection;
    console.log("Connected to Db")
})
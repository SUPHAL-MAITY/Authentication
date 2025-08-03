
import express from "express"
import { connectDb } from "./db/connectDb"
import { getUserController, loginController, registerController } from "./controller/user.controller";
import { auth } from "./middleware/auth.middleware";



const app=express()

app.use(express.json())


connectDb();


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/user",auth ,getUserController)


app.post("/register",registerController)
app.post("/login",loginController)





app.listen(3000,()=>{
    console.log("app is listening at port 3000")
})
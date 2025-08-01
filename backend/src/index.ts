
import express from "express"
import { connectDb } from "./db/connectDb"
import { getUserController } from "./controller/user.controller";



const app=express()

connectDb();


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/user",getUserController)


app.listen(3000,()=>{
    console.log("app is listening at port 3000")
})
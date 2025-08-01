
import express from "express"
import { connectDb } from "./db/connectDb"


const app=express()

connectDb();


app.get("/",(req,res)=>{
    res.send("hello world")
})


app.listen(3000,()=>{
    console.log("app is listening at port 3000")
})
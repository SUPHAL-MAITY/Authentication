import {Request, Response } from "express"
import bcrypt from "bcrypt";

import { User } from "../Schema/User.schema"




const hashPassword=async(password:string):Promise<string>=>{
  const hashed=  await   bcrypt.hash(password,10)

  return hashed;
}


const getUserController=(req: Request, res: Response):void=>{

   res.send("user obtained")

}





const registerController=async(req:Request,res:Response)=>{

     const {name,email,password}=req.body

     console.log(name,email,password)  

     try {

        const existedUser= await User.findOne({email})

        console.log("existedUser",existedUser)

        if(existedUser){
            return res.status(400).json({ message:"user exists before"})
        }


        const hasedPassword= await hashPassword(password)

        const user=await User.create({name,email,password:hasedPassword}) 

        if(!user){
            return res.status(400).json({message:"user not created successfully"})
        }

        return res.status(200).json({message:"user created sucessfully",user})
        
     } catch (error) {
        return res.status(400).json({message:"There is some error while creating user"})
     }


  return;

}



export {getUserController,registerController}
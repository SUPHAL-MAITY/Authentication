import {Request, Response } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { userInputSchema } from "../Types/User.types";

import { User } from "../Schema/User.schema"
import { customRequest } from "../Types/cusomTypes";






const hashPassword=async(password:string):Promise<string>=>{
  const hashed=  await   bcrypt.hash(password,10)

  return hashed;
}


const comparePassword=async(password:string,hash:string):Promise<boolean>=>{
    const isPasswordCorrect= await bcrypt.compare(password,hash)

    return isPasswordCorrect;
}



const token=(email:string):string=>{
   return   jwt.sign({ email:email},process.env.SECRET!,{expiresIn:"24h"})
}


const getUserController=(req: customRequest, res: Response):void=>{

  console.log("user",req.user)

   res.send(req.user?.email)

}





const registerController=async(req:Request,res:Response)=>{

     


     const result=userInputSchema.safeParse(req.body)

     if(!result.success){
      return   res.status(400).json({message:"user input is not  valid",errors: result.error.issues})
     }

     const {name,email,password}=result.data;

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


const loginController=async(req:Request,res:Response)=>{

    const {email,password}=req.body;


    try {

        const user=await User.findOne({email})

        if(!user){
            return res.status(401).json({message:"user does not exist "})
        }

        const isPasswordCorrect= await comparePassword(password , user?.password)


        if(!isPasswordCorrect){
            return res.status(401).json({message:"invalid credentials "})
        }

        
        let tokenString= token(email)

        res.status(200).cookie("token",tokenString).json({message:"user logged in successfully",user,token:tokenString})

        

        
    } catch (error) {

        return res.status(400).json({message:"Error while logging in "})
        
    }

    return;


}



export {getUserController,registerController,loginController}
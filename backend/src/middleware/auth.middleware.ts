import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import { customRequest } from "../Types/cusomTypes";


// interface customRequest  extends Request{
//     user?:{
//         email:String
//     }
// }


export const auth=(req:customRequest,res:Response,next:NextFunction)=>{

    try {

    const authHeader=req.headers.authorization;

    const token=authHeader?.split(" ")[1]

    if(!token){
        return res.status(400).json({message:"token not available"})
    }
    
    const decoded=jwt.verify(token,process.env.SECRET!) as {email: string}

    console.log("decoded",decoded)

    req.user={email:decoded?.email} 


   

        
    } catch (error) {
        return res.status(400).json({message:"error while authenticating in middleware"})
        
    }

    
 next()
    

}
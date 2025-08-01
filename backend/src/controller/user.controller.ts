
import {Request, Response } from "express"

const getUserController=(req: Request, res: Response):void=>{

   res.send("user obtained")

}

export {getUserController}
import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.user;
    let {password} =req.body;
    let response = await userService.changePassword(id, password)
    return res.json({success: response})
  } catch (error) {
    next(error)
  }
}
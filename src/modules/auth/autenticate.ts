import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'
export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password} =req.body;
    let token = await userService.autenticateUser(username, password)
    return res.json({token: token})
  } catch (error) {
    next(error)
  }
}
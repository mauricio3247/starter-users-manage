import { Request, Response, NextFunction } from "express-serve-static-core";
import authService from '@services/auth'
export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password} =req.body;
    let token = await authService.login(username, password)
    return res.json({token: token})
  } catch (error) {
    next(error)
  }
}
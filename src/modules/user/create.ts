import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password, rol} =req.body;
    let account = req.user.account;
    let user = await userService.createUser(username, password, rol, account)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
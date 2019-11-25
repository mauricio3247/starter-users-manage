import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'
import { ACCOUNT_TYPE } from "@models/account";
import { ROLES } from "@models/user";
export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password, email, type} =req.body;
    let token = await accountService.createAccount(email, username, password, type, ROLES.STANDARDUSER)
    return res.json({token: token})
  } catch (error) {
    next(error)
  }
}
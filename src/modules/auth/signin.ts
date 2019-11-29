import { Request, Response, NextFunction } from "express-serve-static-core";
import authService from '@services/auth'
import { ACCOUNT_TYPE } from "@models/account";
import { ROLES } from "@models/user";

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password, email, type} =req.body;
    let account = await authService.signin(email, username, password, type)
    return res.json(account)
  } catch (error) {
    next(error)
  }
}
import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {email, type} = req.body;
    let account = await accountService.createAccount(email, type);
    return res.json(account)
  } catch (error) {
    next(error)
  }
}
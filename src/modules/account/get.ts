import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let myAccount = req.user.account;
    let account = await accountService.getAccountById(myAccount._id)
    return res.json(account)
  } catch (error) {
    next(error)
  }
}
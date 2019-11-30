import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let account = req.user.account;
    let user = await accountService.deleteAccount(account._id)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
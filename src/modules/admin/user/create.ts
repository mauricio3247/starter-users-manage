import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {username, password, rol, accountId} =req.body;
    let account;
    if (accountId != undefined) {
      account = await accountService.getAccountById(accountId)
    }
    let user = await userService.createUser(username, password, rol, account)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
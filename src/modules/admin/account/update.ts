import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let {status} = req.body;
    let account = await accountService.updateAccount(id, status)
    return res.json(account)
  } catch (error) {
    next(error)
  }
}
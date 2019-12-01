import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let accounts = await accountService.getAll()
    return res.json(accounts)
  } catch (error) {
    next(error)
  }
}
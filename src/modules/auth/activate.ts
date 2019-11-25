import { Request, Response, NextFunction } from "express-serve-static-core";
import accountService from '@services/account'
export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id, token} =req.params;
    await accountService.activateAccount(id, token)
    return res.json({success: true})
  } catch (error) {
    next(error)
  }
}
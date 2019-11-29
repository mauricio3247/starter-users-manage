import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let {status, password, rol} =req.body;
    let account = req.user.account;
    let user = await userService.updateUserInMyAccount(id, account._id, status, rol, password)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
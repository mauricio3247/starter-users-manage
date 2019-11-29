import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let account = req.user.account;
    let user = await userService.deleteUserByAccount(id, account._id)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
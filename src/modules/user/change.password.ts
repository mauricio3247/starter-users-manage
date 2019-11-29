import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let {password} =req.body;
    let account = req.user.account;
    let response = await userService.changePassword(id, account._id, password)
    return res.json({success: response})
  } catch (error) {
    next(error)
  }
}
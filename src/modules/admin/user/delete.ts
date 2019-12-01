import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let users = await userService.delete(id)
    return res.json(users)
  } catch (error) {
    next(error)
  }
}
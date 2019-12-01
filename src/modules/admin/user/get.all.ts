import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let users = await userService.getAll()
    return res.json(users)
  } catch (error) {
    next(error)
  }
}
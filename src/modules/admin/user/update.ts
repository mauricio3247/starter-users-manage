import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from '@services/user'

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    let {id} = req.params;
    let {status, password, rol} =req.body;
    let user = await userService.updateUser(id, status, rol, password)
    return res.json(user)
  } catch (error) {
    next(error)
  }
}
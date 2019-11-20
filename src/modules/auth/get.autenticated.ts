import { Request, Response, NextFunction } from "express-serve-static-core";

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
}
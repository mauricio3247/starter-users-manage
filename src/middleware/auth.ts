import UserService from '@services/user'
import {Response, Request, NextFunction } from 'express-serve-static-core';

class AuthGuardMiddleware {
  async isAutenticated (req:Request, res: Response, next: NextFunction) {
    try {
      let headersAuth = req.headers.authorization;
      if (!headersAuth) {
        throw new Error('Invalid Creds');
      }
      let token:string = headersAuth.split(" ")[1];
      req.user = await UserService.getAutenticatedUser(token);
      next();
    } catch (error) {
      res.status(401)
      next(error)
    }
  }

}

export default new AuthGuardMiddleware ();
import UserService from '@services/user'
import AccountService from '@services/account'
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
      if(!UserService.isUserActive(req.user)) {
        throw new Error ('User inactive')
      }

      if(req.user.account && !AccountService.isAccountActive(req.user.account)) {
        throw new Error ('Account is not active')
      }
      next();
    } catch (error) {
      res.status(401)
      next(error)
    }
  }


  async validateLevelRol (valueResult:Boolean, req:Request, res: Response, next: NextFunction) {
    try {
      if(valueResult) {
        return next()
      }
      throw new Error('Forbbiden')
    } catch (error) {
      res.status(401)
      next(new Error('Forbiden'))
    }
  }

  async isAppAdmin (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isAppAdmin(req.user),req, res,next)
  }

  async isAppSupervisorLevel (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isAppSupervisorLevel(req.user),req, res,next)
  }

  async isAppLevelRol (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isAppLevelRol(req.user),req, res,next)
  }

  

  async isBusinessAdmin (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isBusinessAdmin(req.user),req, res,next)
  }

  async isBusinessSupervisorLevel (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isBusinessSupervisorLevel(req.user),req, res,next)
  }

  async isBusinessLevelRol (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isBusinessLevelRol(req.user),req, res,next)
  }

  async isStandardUser (req:Request, res: Response, next: NextFunction) {
    return this.validateLevelRol(UserService.isStandardUser(req.user),req, res,next)
  }

}

export default new AuthGuardMiddleware ();
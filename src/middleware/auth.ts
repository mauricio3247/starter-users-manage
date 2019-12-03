import UserService from '@services/user'
import AccountService from '@services/account'
import { Response, Request, NextFunction } from 'express-serve-static-core';
import errMsgs from '@config/error.messages'

export async function isAutenticated(req: Request, res: Response, next: NextFunction) {
  try {
    let headersAuth = req.headers.authorization;
    if (!headersAuth) {
      throw errMsgs.AUTH.INVALID_CREDS;
    }
    let token: string = headersAuth.split(" ")[1];
    req.user = await UserService.getAutenticatedUser(token);
    if (!UserService.isUserActive(req.user)) {
      throw errMsgs.AUTH.USER_INACTIVE
    }
    if (req.user.account && !AccountService.isAccountActive(req.user.account)) {
      throw errMsgs.AUTH.ACCOUNT_NOT_ACTIVE
    }
    next();
  } catch (error) {
    res.status(401)
    next(error)
  }
}


export async function validateLevelRol(valueResult: Boolean, req: Request, res: Response, next: NextFunction) {
  try {
    if (valueResult) {
      return next()
    }
    throw errMsgs.GENERAL.FORBIDDEN
  } catch (error) {
    res.status(401)
    next(error)
  }
}

export async function isAppAdmin(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isAppAdmin(req.user), req, res, next)
}

export async function isAppSupervisorLevel(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isAppSupervisorLevel(req.user), req, res, next)
}

export async function isAppLevelRol(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isAppLevelRol(req.user), req, res, next)
}

export async function isBusinessAdmin(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isBusinessAdmin(req.user), req, res, next)
}

export async function isBusinessSupervisorLevel(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isBusinessSupervisorLevel(req.user), req, res, next)
}

export async function isBusinessLevelRol(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isBusinessLevelRol(req.user), req, res, next)
}

export async function isStandardUser(req: Request, res: Response, next: NextFunction) {
  return validateLevelRol(UserService.isStandardUser(req.user), req, res, next)
}

export async function preventAutoUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user._id.toString() === req.params.id) {
      throw errMsgs.GENERAL.FORBIDDEN
    }
    return next();
  } catch (error) {
    res.status(401)
    next(error)
  }
}

export async function allowOnlyAutoUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user._id.toString() === req.params.id) {
      return next();
    }
    throw errMsgs.GENERAL.FORBIDDEN
  } catch (error) {
    res.status(401)
    next(error)
  }
}






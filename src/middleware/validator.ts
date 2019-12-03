
import {Response, Request, NextFunction } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import errMsgs from '@config/error.messages'
import _ from 'lodash'
class ValidatorMiddleware {
  async checkValidations (req:Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json(_.assign(errMsgs.GENERAL.VALIDATION_DATA ,{errors: errors.array() }));
        return;
      }
      next();
    } catch (error) {
      res.status(401)
      next(error)
    }
  }

}

export default new ValidatorMiddleware();
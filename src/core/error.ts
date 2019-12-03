import {Response, Request, NextFunction } from 'express-serve-static-core';
import Logger from '@core/logger'
import errMsgs from '@config/error.messages'
import _ from 'lodash'
class ErrorHandler {
  error404(req:any, res:any, next:any) {
    let err = errMsgs.GENERAL.NOT_FOUND;
    res.status(404)
    next(err);
  }

  errorGeneral(err:any, req:Request, res:Response, next:NextFunction) {
    res.status(res.statusCode || 400);
    try {
      if (err.errorApp){
        Logger.log('error', _.clone(err))
        res.json(err);
      } else {
        Logger.log('error', err)
        res.json({ code:'SYSTEM_ERROR', message: 'SYSTEM_ERROR' })
      }
    } catch (e) {
      Logger.log('error', e.message || 'SYSTEM_ERROR')
      res.json({ success: false, code:'SYSTEM_ERROR', message: 'SYSTEM_ERROR' });
    }
  }
}

export default new ErrorHandler();

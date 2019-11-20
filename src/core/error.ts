import {Response, Request, NextFunction } from 'express-serve-static-core';
import Logger from '@core/logger'
class ErrorHandler {
  error404(req:any, res:any, next:any) {
    let err = new Error('NOT_FOUND');
    res.status(404)
    next(err);
  }

  errorGeneral(err:any, req:Request, res:Response, next:NextFunction) {
    res.status(res.statusCode || 400);
    try {
      if (err.message != undefined && err.message != null){
        Logger.log('error', err.message)
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: false, message: 'SYSTEM_ERROR' })
      }
    } catch (e) {
      Logger.log('error', e.message || 'SYSTEM_ERROR')
      res.json({ success: false, message: 'SYSTEM_ERROR' });
    }
  }
}

export default new ErrorHandler();

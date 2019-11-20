import express from 'express';
import authRouter from '@modules/auth/auth.routes'
export default (app: express.Application) => {
  app.use('/auth', authRouter)
}
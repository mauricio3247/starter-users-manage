import express from 'express';
import authRouter from '@modules/auth/auth.routes'
import userRouter from '@modules/user/user.routes'
export default (app: express.Application) => {
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
}
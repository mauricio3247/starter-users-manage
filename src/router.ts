import express from 'express';
import authMidd from '@middleware/auth'
import authRouter from '@modules/auth/auth.routes'
import userRouter from '@modules/user/user.routes'
import accountRouter from '@modules/account/account.routes'

import admAccountRouter from '@modules/admin/account/adm.account.routes'
import admUserRouter from '@modules/admin/user/adm.user.routes'
export default (app: express.Application) => {
  app.use('/auth', authRouter)
  app.use('/users', [
    authMidd.isAutenticated
  ], userRouter)

  app.use('/account', [
    authMidd.isAutenticated
  ], accountRouter)

  app.use('/admin/accounts', [
    authMidd.isAutenticated
  ], admAccountRouter)

  app.use('/admin/users', [
    authMidd.isAutenticated
  ], admUserRouter)
}
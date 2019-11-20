require('module-alias/register');
import * as dotenv from 'dotenv';
dotenv.config();
import app from './app'
import CONSTS from '@config/constants'
import userService from '@services/user'
import mongoose from 'mongoose'

async function bootApp () {
  try {
    const PORT:any = CONSTS.APP.PORT
    const {ADM_USERNAME, ADM_PASSWORD} = CONSTS.SECURE;
    await mongoose.connect(CONSTS.DB.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
    await userService.createMainUser(ADM_USERNAME,ADM_PASSWORD)
    app.listen(PORT, ()=> {
      console.log('App service runing...')
    })
  } catch (error) {
    console.log('Error trying run app', error)
  }
}

bootApp();
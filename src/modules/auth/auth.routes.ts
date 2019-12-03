import {Router} from 'express';
import * as auth from '@middleware/auth'
import validator from '@middleware/validator'
import getAutenticated from './get.autenticated'
import autenticate from './login'
import signin from './signin'
import activate from './activate'
import {check} from 'express-validator'
import { ACCOUNT_TYPE } from '@models/account';
import _ from 'lodash';

const router= Router();

router.get('/profile', [auth.isAutenticated] , getAutenticated)

router.get('/activate/:id/:token', [
  check('id').isMongoId(),
  check('token').isLength({min: 3}),
  validator.checkValidations
], activate)

router.post('/signin', [
  check('email').isEmail(),
  check('type').isIn(_.values(ACCOUNT_TYPE)),
  check('username').isLength({min: 3}),
  check('password').isLength({min: 3}),
  validator.checkValidations
], signin)

router.post('/login', [
  check('username').isLength({min: 3}),
  check('password').isLength({min: 3}),
  validator.checkValidations
], autenticate)

export default router;
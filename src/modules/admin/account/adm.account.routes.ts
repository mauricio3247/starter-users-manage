import {Router} from 'express';
import * as auth from '@middleware/auth'
import validator from '@middleware/validator'

import {check} from 'express-validator'

import get from './get'
import getAll from './get.all'
import deleteAccount from './delete'
import create from './create'
import update from './update'

import _ from 'lodash';
import { ACCOUNT_TYPE, STATUS } from '@models/account';


const router= Router();

router.get('/', [
  auth.isAppSupervisorLevel,
], getAll)

router.get('/:id', [
  auth.isAppSupervisorLevel,
  check('id').isMongoId(),
  validator.checkValidations
], get)

router.delete('/:id', [
  auth.isAppAdmin,
  check('id').isMongoId(),
  validator.checkValidations
], deleteAccount)


router.post('/', [
  auth.isAppSupervisorLevel,
  check('email').isEmail(),
  check('type').isIn(_.values(ACCOUNT_TYPE)),
  validator.checkValidations
], create)

router.put('/:id', [
  auth.isAppSupervisorLevel,
  check('id').isMongoId(),
  check('status').isIn(_.values(STATUS)),
  validator.checkValidations
], update)


export default router;
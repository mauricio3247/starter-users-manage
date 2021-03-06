import {Router} from 'express';
import * as auth from '@middleware/auth'
import validator from '@middleware/validator'

import {check} from 'express-validator'
import create from './create';
import update from './update';
import get from './get'
import getAll from './get.all'
import changePassword from './change.password'
import deleteUser from  './delete'
import _ from 'lodash';
import { ROLES, STATUS } from '@models/user';


const router= Router();

router.get('/', [
  auth.isAppSupervisorLevel,
], getAll)

router.get('/:id', [
  auth.isAppSupervisorLevel,
  check('id').isMongoId(),
  validator.checkValidations
], get)

router.post('/', [
  auth.isAppAdmin,
  check('accountId').isMongoId().optional(),
  check('rol').isIn(_.values(ROLES)),
  check('username').isLength({min: 3}),
  check('password').isLength({min: 3}),
  validator.checkValidations
], create)


router.put('/:id', [
  auth.isAppAdmin,
  auth.preventAutoUpdate,
  check('id').isMongoId(),
  check('rol').isIn(_.values(ROLES)),
  check('status').isIn([STATUS.ACTIVE, STATUS.INACTIVE]),
  check('password').optional().isLength({min: 3}),
  validator.checkValidations
], update)

router.delete('/:id', [
  auth.isAppAdmin,
  auth.preventAutoUpdate,
  check('id').isMongoId(),
  validator.checkValidations
], deleteUser)

router.patch('/password', [
  check('password').isLength({min: 3}),
  validator.checkValidations
], changePassword)

export default router;
import {Router} from 'express';
import auth from '@middleware/auth'
import validator from '@middleware/validator'

import {check} from 'express-validator'
import create from './create';
import update from './update';
import get from './get'
import getAll from './get.all'
import changePassword from './change.password'
import deleteUser from  './delete'
import _ from 'lodash';
import { ROLES } from '@models/user';
import { STATUS } from '@models/account';

const router= Router();

router.get('/', [
  auth.isAutenticated,
  auth.isBusinessSupervisorLevel,
], getAll)

router.get('/:id', [
  auth.isAutenticated,
  auth.isBusinessSupervisorLevel,
  check('id').isMongoId(),
  validator.checkValidations
], get)

router.delete('/:id', [
  auth.isAutenticated,
  auth.isBusinessAdmin,
  auth.preventAutoUpdate,
  check('id').isMongoId(),
  validator.checkValidations
], deleteUser)

router.post('/', [
  auth.isAutenticated,
  auth.isBusinessAdmin,
  check('rol').isIn([ROLES.BUSADMIN, ROLES.BUSSUPERVISOR, ROLES.BUSOPERATOR]),
  check('username').isLength({min: 3}),
  check('password').isLength({min: 3}),
  validator.checkValidations
], create)

router.put('/:id', [
  auth.isAutenticated,
  auth.isBusinessAdmin,
  auth.preventAutoUpdate,
  check('id').isMongoId(),
  check('rol').isIn([ROLES.BUSADMIN, ROLES.BUSSUPERVISOR, ROLES.BUSOPERATOR]),
  check('status').isIn([STATUS.ACTIVE, STATUS.INACTIVE]),
  check('password').optional().isLength({min: 3}),
  validator.checkValidations
], update)


router.patch('/password/:id', [
  auth.isAutenticated,
  auth.allowOnlyAutoUpdate,
  check('id').isMongoId(),
  validator.checkValidations
], changePassword)

export default router;
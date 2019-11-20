import {Router} from 'express';
import auth from '@middleware/auth'
import validator from '@middleware/validator'
import getAutenticated from './get.autenticated'
import autenticate from './autenticate'
import {check} from 'express-validator'

const router= Router();

router.get('/', [auth.isAutenticated] , getAutenticated)
router.post('/', [
  check('username').isLength({min: 3}),
  check('password').isLength({min: 3}),
  validator.checkValidations
], autenticate)

export default router;
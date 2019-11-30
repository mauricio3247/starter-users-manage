import {Router} from 'express';
import auth from '@middleware/auth'
import get from './get'
import deleteAccount from './delete'
import _ from 'lodash';

const router= Router();

router.get('/', [
  auth.isAutenticated,
  auth.isBusinessSupervisorLevel,
], get)


router.delete('/', [
  auth.isAutenticated,
  auth.isBusinessAdmin,
], deleteAccount)
export default router;
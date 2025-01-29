import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/users', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
  '/users/me',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  UserControllers.getMe,
);

router.post(
  '/users/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  '/users/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;

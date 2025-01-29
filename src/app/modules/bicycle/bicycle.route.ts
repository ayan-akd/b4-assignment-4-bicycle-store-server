import express from 'express';
import { BicycleController } from './bicycle.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createBicycleValidationSchema,
  updateBicycleValidationSchema,
} from './bicycle.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/products', BicycleController.getAllBicycles);

router.get('/products/:productId', BicycleController.getSingleBicycle);

router.get('/brands', BicycleController.getBrands);

router.post(
  '/products',
  auth(USER_ROLE.admin),
  validateRequest(createBicycleValidationSchema),
  BicycleController.createBicycle,
);



router.patch(
  '/products/:productId',
  auth(USER_ROLE.admin),
  validateRequest(updateBicycleValidationSchema),
  BicycleController.updateBicycle,
);

router.delete(
  '/products/:productId',
  auth(USER_ROLE.admin),
  BicycleController.deleteBicycle,
);

export const BicycleRoutes = router;

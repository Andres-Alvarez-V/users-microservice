import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { createUserSchema } from '../../app/dtos/request/user.dto';
import { userController } from '../dependecies';
import { uniqueEmailValidator } from '../middlewares/uniqueEmailValidator';

const router = Router();

router.post(
	'/crearPropietario',
	validatorHandler(createUserSchema, 'body'),
	uniqueEmailValidator(),
	userController.create.bind(userController),
);

export default router;

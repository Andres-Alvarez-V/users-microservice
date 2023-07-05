import { Router } from 'express';
import { userController } from '../dependecies';
import { validatorSchemaHandler } from '../middlewares/validator.handler';
import { loginUserSchema } from '../../app/dtos/request/user.dto';

const router = Router();

router.get('/', userController.findById.bind(userController));
router.post(
	'/iniciar-sesion',
	validatorSchemaHandler(loginUserSchema, 'body'),
	userController.signIn.bind(userController),
);

export default router;

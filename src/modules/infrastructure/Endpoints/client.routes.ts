import { Router } from 'express';
import {
	validatorEmailDuplicateHandler,
	validatorSchemaHandler,
} from '../middlewares/validator.handler';
import { createClientSchema } from '../../app/dtos/request/user.dto';
import { userController } from '../dependecies';

const router = Router();

router.post(
	'/crear-cliente',
	validatorSchemaHandler(createClientSchema, 'body'),
	validatorEmailDuplicateHandler(),
	userController.createClient.bind(userController),
);

export default router;

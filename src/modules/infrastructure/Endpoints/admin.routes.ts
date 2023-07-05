import { Router } from 'express';
import {
	validatorEmailDuplicateHandler,
	validatorJWTRoleHandler,
	validatorSchemaHandler,
} from '../middlewares/validator.handler';
import { createUserSchema } from '../../app/dtos/request/user.dto';
import { userController } from '../dependecies';
import { RoleType } from '../../domain/enums/role-type.enum';

const router = Router();

router.post(
	'/crearPropietario',
	validatorJWTRoleHandler(RoleType.ADMIN),
	validatorSchemaHandler(createUserSchema, 'body'),
	validatorEmailDuplicateHandler(),
	userController.create.bind(userController),
);

export default router;

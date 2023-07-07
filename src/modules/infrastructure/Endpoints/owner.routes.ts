import { Router } from 'express';
import {
	validatorEmailDuplicateHandler,
	validatorJWTRoleHandler,
	validatorSchemaHandler,
} from '../middlewares/validator.handler';
import { createEmployeeSchema } from '../../app/dtos/request/user.dto';
import { RoleType } from '../../domain/enums/role-type.enum';
import { userController } from '../dependecies';

const router = Router();

router.post(
	'/crearEmpleado',
	validatorJWTRoleHandler(RoleType.OWNER),
	validatorSchemaHandler(createEmployeeSchema, 'body'),
	validatorEmailDuplicateHandler(),
	userController.createEmployee.bind(userController),
);

export default router;

import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { createUserSchema } from '../../app/dtos/request/user.dto';
import { userController } from '../dependecies';
import { uniqueEmailValidator } from '../middlewares/uniqueEmailValidator';

const router = Router();

/**
 * @openapi
 * /api/v1/admin/crearPropietario:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create owner
 *     description: Create a new user type of owner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       '201':
 *         description: "Successful Response"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessfulResponse'
 *       '400':
 *         description: "Missing data or with any wrong."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         numero_documento:
 *           type: string
 *         celular:
 *           type: string
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *         correo:
 *           type: string
 *         clave:
 *           type: string
 *     SuccessfulResponse:
 *         type: object
 *         properties:
 *             message:
 *               type: string
 *               example: successful confirmation message
 *     FailResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: http status code
 *         errorMessage:
 *           type: string
 *           example: fail message
 */
router.post(
	'/crearPropietario',
	validatorHandler(createUserSchema, 'body'),
	uniqueEmailValidator(),
	userController.create.bind(userController),
);
export default router;

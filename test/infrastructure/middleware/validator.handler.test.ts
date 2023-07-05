import { Request, Response } from 'express';
import { createUserSchema, loginUserSchema } from '../../../src/modules/app/dtos/request/user.dto';
import {
	validatorEmailDuplicateHandler,
	validatorJWTRoleHandler,
	validatorSchemaHandler,
} from '../../../src/modules/infrastructure/middlewares/validator.handler';
import dotenv from 'dotenv';
import { RoleType } from '../../../src/modules/domain/enums/role-type.enum';

dotenv.config();

describe('ValidatoHandler', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('It should validate the create user schema', () => {
		req = {
			...req,
			body: {
				nombre: 'John',
				apellido: 'Doe',
				numero_documento: '12345678',
				celular: '+51987654321',
				fecha_nacimiento: '1990-01-01',
				correo: 'mockExample@mail.com',
				clave: '12345678',
			},
		};
		res = {};
		next = jest.fn();

		validatorSchemaHandler(createUserSchema, 'body')(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith();
	});

	it('It should validate the login user schema', () => {
		req = {
			...req,
			body: {
				correo: 'correo@mail.com',
				clave: '12345678',
			},
		};
		res = {};
		next = jest.fn();

		validatorSchemaHandler(loginUserSchema, 'body')(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith();
	});

	it('It should validate the create user schema and call next with error if validation fails', () => {
		req = {
			...req,
			body: {
				nombre: 'John',
				apellido: 'Doe',
				numero_documento: 'invalido',
				celular: 'invalido',
				fecha_nacimiento: 'invalido',
				correo: 'mockExample@mail.com',
				clave: '12345678',
			},
		};
		res = {};
		next = jest.fn();

		validatorSchemaHandler(createUserSchema, 'body')(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it('It should validate the login user schema and call next with error if validation fails', () => {
		req = {
			...req,
			body: {
				correo: 'mockExample.mail.com',
				clave: '12345678',
			},
		};
		res = {};
		next = jest.fn();

		validatorSchemaHandler(loginUserSchema, 'body')(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it('It should validate the email duplicate', async () => {
		req = {
			...req,
			body: {
				correo: 'correoinexistente@mail.com',
			},
		};
		res = {};
		next = jest.fn();

		await validatorEmailDuplicateHandler()(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith();
	});

	it('It should validate the email duplicate and call next with error if validation fails', async () => {
		req = {
			...req,
			body: {
				correo: 'admin@mail.com',
			},
		};
		res = {};
		next = jest.fn();
		await validatorEmailDuplicateHandler()(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});

	it('It should validate the JWT role', () => {
		req = {
			...req,
			headers: {
				...req.headers,
				authorization: `Bearer ${process.env.JWT_ADMIN_TOKEN_TEST as string}`,
			},
		};
		res = {};
		next = jest.fn();
		validatorJWTRoleHandler(RoleType.ADMIN)(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith();
	});

	it('It should validate the JWT role and call next with error if validation fails', () => {
		req = {
			...req,
			headers: {
				...req.headers,
				authorization: `${process.env.JWT_USER_TOKEN_TEST as string}invalido`,
			},
		};
		res = {};
		next = jest.fn();
		validatorJWTRoleHandler(RoleType.ADMIN)(req as Request, res as Response, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});
});

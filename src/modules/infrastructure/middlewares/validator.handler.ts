import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { userRepository } from '../dependecies';
import { RoleType } from '../../domain/enums/role-type.enum';

export const validatorSchemaHandler = (schema: Schema, property: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const data = req[property as keyof typeof req];
		const { error } = schema.validate(data, { abortEarly: false });
		if (error) {
			next(boom.badRequest(error));

			return;
		}
		next();
	};
};

export const validatorEmailDuplicateHandler = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { correo } = req.body;
		try {
			const user = await userRepository.findByEmail(correo);
			if (user) {
				next(boom.badRequest('Email already exists'));

				return;
			}
			next();
		} catch (error) {
			next(boom.badImplementation('An error occurred while checking the email'));
		}
	};
};

export const validatorJWTRoleHandler = (role: RoleType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.headers.authorization === undefined) {
			next(boom.unauthorized('Token no encontrado'));

			return;
		}
		const token = (req.headers.authorization as string).split(' ')[1];
		const tokenDecoded = userRepository.verifyJWT(token);
		if (tokenDecoded.error) {
			next(boom.unauthorized('Token invalido'));

			return;
		}
		const payload = JSON.parse(tokenDecoded.payload as string);
		if (payload.role !== role) {
			next(boom.unauthorized('No autorizado'));

			return;
		}
		next();
	};
};

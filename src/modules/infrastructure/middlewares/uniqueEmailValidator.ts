import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../dependecies';

export const uniqueEmailValidator = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { correo } = req.body;
		try {
			const user = await userRepository.findByEmail(correo);
			if (user) {
				next(boom.badRequest('Email already exists'));
			}
			next();
		} catch (error) {
			next(boom.badImplementation('An error occurred while checking the email'));
		}
	};
};

import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validatorHandler = (schema: Schema, property: string) => {
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

import Joi from 'joi';
import { IUser } from '../../../domain/entities/user';

export interface ICreateUserDTO extends Omit<IUser, 'id' | 'id_rol'> {}

const name = Joi.string().min(3).max(254);
const lastName = Joi.string().max(254);
const documentNumber = Joi.string().pattern(/^[0-9]{8,20}$/);
const phone = Joi.string().pattern(/^\+?[0-9]{10,13}$/);
const currentDate = new Date();
const maxBirthday = new Date(
	currentDate.getFullYear() - 18,
	currentDate.getMonth(),
	currentDate.getDate(),
);
const birthdate = Joi.date().max(maxBirthday);
const email = Joi.string().email();
const password = Joi.string().max(254);

export const createUserSchema = Joi.object<ICreateUserDTO>({
	nombre: name.required(),
	apellido: lastName.required(),
	numero_documento: documentNumber.required(),
	celular: phone.required(),
	fecha_nacimiento: birthdate.required(),
	correo: email.required(),
	clave: password.required(),
}).options({
	messages: {
		'string.min': '{#label} debe tener al menos {#limit} caracteres',
		'string.max': '{#label} debe tener como máximo {#limit} caracteres',
		'string.pattern.base': '{#label} no cumple con el formato válido',
		'date.max': 'Debes tener al menos 18 años para registrarte',
		'string.email': '{#label} debe ser un correo electrónico válido',
		'any.required': '{#label} es un campo obligatorio',
	},
});

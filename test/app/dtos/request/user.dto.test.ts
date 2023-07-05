import {
	ICreateUserDTO,
	ILoginUserDTO,
	createUserSchema,
	loginUserSchema,
} from '../../../../src/modules/app/dtos/request/user.dto';

describe('UserDto', () => {
	const validUser: ICreateUserDTO = {
		nombre: 'test',
		apellido: 'test',
		numero_documento: '12345678',
		celular: '+51987654321',
		fecha_nacimiento: new Date('1990-01-01'),
		correo: 'test@mail.com',
		clave: 'test',
	};

	const validLoginUser: ILoginUserDTO = {
		correo: 'admin@mail.com',
		clave: 'admin',
	};

	it('should validate a valid login user', () => {
		const { error } = loginUserSchema.validate(validLoginUser, { abortEarly: false });
		expect(error).toBeUndefined();
	});

	it('should return error because "email" and "password" are required', () => {
		const invalidUser = {};
		const { error } = createUserSchema.validate(invalidUser, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"correo" es un campo obligatorio');
		expect(errorMessages).toContain('"clave" es un campo obligatorio');
	});

	it('shuld validate a valid user', () => {
		const { error } = createUserSchema.validate(validUser, { abortEarly: false });
		expect(error).toBeUndefined();
	});

	it('should return error because "document number" and "phone" should be a number', () => {
		const invalidUser: ICreateUserDTO = {
			...validUser,
			numero_documento: '12345678a',
			celular: '+5198754321a',
		};
		const { error } = createUserSchema.validate(invalidUser, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"numero_documento" no cumple con el formato válido');
		expect(errorMessages).toContain('"celular" no cumple con el formato válido');
	});

	it('should return error because "nombre", "apellido", "document number", "phone", "birthdate", "email" and "password" are required', () => {
		const invalidUser = {};
		const { error } = createUserSchema.validate(invalidUser, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"nombre" es un campo obligatorio');
		expect(errorMessages).toContain('"apellido" es un campo obligatorio');
		expect(errorMessages).toContain('"numero_documento" es un campo obligatorio');
		expect(errorMessages).toContain('"celular" es un campo obligatorio');
		expect(errorMessages).toContain('"fecha_nacimiento" es un campo obligatorio');
		expect(errorMessages).toContain('"correo" es un campo obligatorio');
		expect(errorMessages).toContain('"clave" es un campo obligatorio');
	});
});

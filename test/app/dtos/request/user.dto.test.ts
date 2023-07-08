import {
	ICreateClientDTO,
	ICreateEmployeeDTO,
	ICreateUserDTO,
	ILoginUserDTO,
	createClientSchema,
	createEmployeeSchema,
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

describe('createEmployeeSchema', () => {
	const employeeMock: ICreateEmployeeDTO = {
		nombre: 'test',
		apellido: 'test',
		numero_documento: '123456789',
		celular: '5551234323',
		fecha_nacimiento: '2000-01-01',
		correo: 'test@example.com',
		clave: 'password',
		id_restaurante: 1,
	};

	it('should validate a valid employee', () => {
		const { error } = createEmployeeSchema.validate(employeeMock, { abortEarly: false });
		expect(error).toBeUndefined();
	});

	it('should return error because "document number" and "phone" should be a number', () => {
		const invalidEmployee: ICreateEmployeeDTO = {
			...employeeMock,
			numero_documento: '12345678a',
			celular: '5551234323a',
		};
		const { error } = createEmployeeSchema.validate(invalidEmployee, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"numero_documento" no cumple con el formato válido');
		expect(errorMessages).toContain('"celular" no cumple con el formato válido');
	});

	it('should return a error because "nombre", "apellido", "numero_documento", "celular", "correo", "clave" and "restaurantId" is required', () => {
		const invalidEmployee = {};
		const { error } = createEmployeeSchema.validate(invalidEmployee, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"nombre" es un campo obligatorio');
		expect(errorMessages).toContain('"apellido" es un campo obligatorio');
		expect(errorMessages).toContain('"numero_documento" es un campo obligatorio');
		expect(errorMessages).toContain('"celular" es un campo obligatorio');
		expect(errorMessages).toContain('"correo" es un campo obligatorio');
		expect(errorMessages).toContain('"clave" es un campo obligatorio');
		expect(errorMessages).toContain('"id_restaurante" es un campo obligatorio');
	});
});

describe('createClientSchema', () => {
	const clientMock: ICreateClientDTO = {
		nombre: 'test',
		apellido: 'test',
		numero_documento: '123456789',
		celular: '5551234323',
		correo: 'testcreateclient@routes.com',
		clave: 'password',
	};

	it('should validate a valid client', () => {
		const { error } = createClientSchema.validate(clientMock, { abortEarly: false });
		expect(error).toBeUndefined();
	});

	it('should return error because "document number" and "phone" should be a number', () => {
		const invalidClient: ICreateClientDTO = {
			...clientMock,
			numero_documento: '12345678a',
			celular: '5551234323a',
		};
		const { error } = createClientSchema.validate(invalidClient, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"numero_documento" no cumple con el formato válido');
		expect(errorMessages).toContain('"celular" no cumple con el formato válido');
	});

	it('should return a error because "nombre", "apellido", "numero_documento", "celular", "correo" and "clave" is required', () => {
		const invalidClient = {};
		const { error } = createClientSchema.validate(invalidClient, { abortEarly: false });
		expect(error).toBeDefined();
		const errorMessages = error?.details.map((detail) => detail.message);
		expect(errorMessages).toContain('"nombre" es un campo obligatorio');
		expect(errorMessages).toContain('"apellido" es un campo obligatorio');
		expect(errorMessages).toContain('"numero_documento" es un campo obligatorio');
		expect(errorMessages).toContain('"celular" es un campo obligatorio');
		expect(errorMessages).toContain('"correo" es un campo obligatorio');
		expect(errorMessages).toContain('"clave" es un campo obligatorio');
	});
});

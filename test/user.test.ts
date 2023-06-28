import { application } from '../src/main';
import { Application } from 'express';
import request from 'supertest';

const newUser = {
	nombre: 'test',
	apellido: 'Doe',
	numero_documento: '123456789',
	celular: '5551234323',
	fecha_nacimiento: '2000-01-01',
	correo: 'test@example.com',
	clave: 'password123',
};

// eslint-disable-next-line no-undef
describe('createUser -- NOTE -> change the newUser data dummy or delete it from db', () => {
	const app: Application = application.getInstance();
	// eslint-disable-next-line no-undef
	test('should return 201 response', async () => {
		const response = await request(app).post('/api/v1/admin/crearPropietario').send(newUser);
		// eslint-disable-next-line no-undef
		expect(response.statusCode).toEqual(201);
	});
	// eslint-disable-next-line no-undef
	test('should throw a message error if user with the same email already exists', async () => {
		const response = await request(app).post('/api/v1/admin/crearPropietario').send(newUser);
		// eslint-disable-next-line no-undef
		expect(response.body.message).toEqual('Email already exists');
	});
});

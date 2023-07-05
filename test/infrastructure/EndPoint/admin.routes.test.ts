import { App } from '../../../src/app';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const newUser = {
	nombre: 'test',
	apellido: 'test',
	numero_documento: '123456789',
	celular: '5551234323',
	fecha_nacimiento: '2000-01-01',
	correo: 'test@example.com',
	clave: 'password',
};

const app = new App().getInstance();
describe('createUser -- NOTE -> change the newUser data dummy or delete it from db', () => {
	test('should return 201 response', async () => {
		const response = await request(app)
			.post('/api/v1/admin/crearPropietario')
			.set('Authorization', `Bearer ${process.env.JWT_ADMIN_TOKEN_TEST}`)
			.send(newUser);
		expect(response.statusCode).toEqual(201);
	});
	test('should throw a message error if user with the same email already exists', async () => {
		const response = await request(app)
			.post('/api/v1/admin/crearPropietario')
			.set('Authorization', `Bearer ${process.env.JWT_ADMIN_TOKEN_TEST}`)
			.send(newUser);
		expect(response.body.message).toEqual('Email already exists');
	});
	test('should throw a message error if the token is no valid', async () => {
		const response = await request(app)
			.post('/api/v1/admin/crearPropietario')
			.set('Authorization', `Bearer ${process.env.JWT_ADMIN_TOKEN_TEST}invalido`)
			.send(newUser);
		expect(response.body.message).toEqual('Token invalido');
	});
});

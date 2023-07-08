import { App } from '../../../src/app';
import request from 'supertest';

const app = new App().getInstance();
describe('clientRoutes', () => {
	describe('createClient', () => {
		const newClient = {
			nombre: 'test',
			apellido: 'test',
			numero_documento: '123456789',
			celular: '5551234323',
			correo: 'testcreateclient@routes.com',
			clave: 'password',
		};
		it('should return 201 response', async () => {
			const response = await request(app).post('/api/v1/client/crear-cliente').send(newClient);

			expect(response.statusCode).toEqual(201);
		});

		it('should throw a message error if user with the same email already exists', async () => {
			const response = await request(app).post('/api/v1/client/crear-cliente').send(newClient);
			expect(response.body.message).toEqual('Email already exists');
		});
	});
});

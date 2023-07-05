import { App } from '../../../src/app';
import request from 'supertest';

const app = new App().getInstance();
describe('user.routes - Test the general user routes', () => {
	it('Get user details by ID and query parameters. Should response with status 200', async () => {
		const response = await request(app).get('/api/v1/user?id=10&querySearch=role');
		expect(response.statusCode).toEqual(200);
	});

	it('Get user details by ID and query parameters. Should response with status 400. Invalid querySearch', async () => {
		const response = await request(app).get('/api/v1/user?id=10&querySearch=invalid');
		expect(response.statusCode).toEqual(400);
	});

	it('should test the user login route. Getting a valid token and status 200. Check that exist in the DB', async () => {
		const response = await request(app).post('/api/v1/user/iniciar-sesion').send({
			correo: 'test@test.com',
			clave: 'password',
		});
		expect(response.statusCode).toEqual(200);
		expect(response.body).toHaveProperty('token');
	});

	it('should test the user login route. Getting a  status 401', async () => {
		const response = await request(app).post('/api/v1/user/iniciar-sesion').send({
			correo: 'test@test.com',
			clave: 'invalid',
		});
		expect(response.statusCode).toEqual(401);
	});

	it('should test the user login route. Getting a  status 404', async () => {
		const response = await request(app).post('/api/v1/user/iniciar-sesion').send({
			correo: 'notfoundmail@mail.com',
			clave: 'invalid',
		});
		expect(response.statusCode).toEqual(404);
	});

	it('should test the user login route. Getting a  status 400', async () => {
		const response = await request(app).post('/api/v1/user/iniciar-sesion').send({
			correo: 'invalid',
			clave: 'invalid',
		});
		expect(response.statusCode).toEqual(400);
	});
});

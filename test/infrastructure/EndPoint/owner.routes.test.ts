import { App } from '../../../src/app';
import request from 'supertest';
import { ICreateEmployeeDTO } from '../../../src/modules/app/dtos/request/user.dto';

const app = new App().getInstance();
describe('crearEmpleado', () => {
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
	it('should create a new employee successfully. With status 201. If dont work check that plazoleta microservices is working', async () => {
		const response = await request(app)
			.post('/api/v1/propietario/crearEmpleado')
			.set('Authorization', `Bearer ${process.env.JWT_OWNER_TOKEN_TEST}`)
			.send(employeeMock);
		expect(response.status).toEqual(201);
	});

	it('should return a status 401. Toke is not valid', async () => {
		const response = await request(app)
			.post('/api/v1/propietario/crearEmpleado')
			.set('Authorization', `Bearer ${process.env.JWT_OWNER_TOKEN_TEST}invalido`);
		expect(response.status).toEqual(401);
	});

	it('should return a status 400. Bad request. Email already exist', async () => {
		const response = await request(app)
			.post('/api/v1/propietario/crearEmpleado')
			.set('Authorization', `Bearer ${process.env.JWT_OWNER_TOKEN_TEST}`)
			.send(employeeMock);
		expect(response.status).toEqual(400);
	});
});

import axios from 'axios';
import boom from '@hapi/boom';
import { PlazoletaMicroservice } from '../../../src/modules/infrastructure/microservices/plazoletaMicroservice';
import dotenv from 'dotenv';

dotenv.config();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PlazoletaMicroservice', () => {
	let plazoletaMicroservice: PlazoletaMicroservice;

	beforeEach(() => {
		plazoletaMicroservice = new PlazoletaMicroservice();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createEmployee', () => {
		it('should create a new employee successfully', async () => {
			const restaurantId = 1;
			const employeeId = 123;
			const token = 'your_token';

			const responseMock = {
				status: 201,
				data: {},
			};
			mockedAxios.post.mockResolvedValue(responseMock);

			await plazoletaMicroservice.createEmployee(restaurantId, employeeId, token);

			expect(mockedAxios.post).toHaveBeenCalledTimes(1);
			expect(mockedAxios.post).toHaveBeenCalledWith(
				`${process.env.PLAZA_MICROSERVICE_BASE_URL}/propietario/agregarEmpleado`,
				{
					id_restaurante: restaurantId,
					id_empleado: employeeId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				},
			);
		});

		it('should throw an error when the employee creation fails', async () => {
			const restaurantId = 1;
			const employeeId = 123;
			const token = 'your_token';

			const responseMock = {
				status: 500,
				data: {},
			};
			mockedAxios.post.mockResolvedValue(responseMock);

			await expect(
				plazoletaMicroservice.createEmployee(restaurantId, employeeId, token),
			).rejects.toThrow(boom.badImplementation('Error creando empleado'));
		});
	});
});

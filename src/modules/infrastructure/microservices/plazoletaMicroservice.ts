import { IPlazoletaMicroservice } from '../../domain/microservices/plazoleta';
import axios from 'axios';
import boom from '@hapi/boom';

export class PlazoletaMicroservice implements IPlazoletaMicroservice {
	private readonly plazoletaUrl = process.env.PLAZA_MICROSERVICE_BASE_URL as string;
	constructor() {}

	async createEmployee(restaurantId: number, employeeId: number, token: string) {
		const response = await axios.post(
			`${this.plazoletaUrl}/propietario/agregarEmpleado`,
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

		if (response.status !== 201) {
			throw boom.badImplementation('Error creando empleado');
		}
	}
}

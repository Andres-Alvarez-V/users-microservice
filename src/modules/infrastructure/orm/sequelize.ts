import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { setUpModels } from '.';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICreateUserDTO } from '../../app/dtos/request/user.dto';

dotenv.config();

export class UserRepository implements IUserRepository {
	private sequelize: Sequelize;

	constructor() {
		this.sequelize = new Sequelize({
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: 'localhost',
			port: process.env.DB_PORT as unknown as number,
			dialect: 'postgres',
		});
		setUpModels(this.sequelize);
		this.sequelize.sync();
	}

	async create(data: ICreateUserDTO) {
		await this.sequelize.models.usuarios.create(data);
	}
}

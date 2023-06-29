import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { setUpModels } from '.';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICreateUserDTO } from '../../app/dtos/request/user.dto';
import bcrypt from 'bcrypt';
import { IUser } from '../../domain/entities/user';

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

	async findByEmail(email: string) {
		const user = await this.sequelize.models.usuarios.findOne({ where: { correo: email } });

		return user;
	}

	async findById(id: number) {
		const user = await this.sequelize.models.usuarios.findOne({ where: { id } });
		let userJSON: IUser | null = null;
		if (user) {
			userJSON = user.toJSON() as IUser;
		}

		return userJSON;
	}

	async encryptPassword(password: string) {
		const salt = await bcrypt.genSalt(10);

		return await bcrypt.hash(password, salt);
	}

	async comparePassword(password: string, receivedPassword: string) {
		return await bcrypt.compare(password, receivedPassword);
	}
}

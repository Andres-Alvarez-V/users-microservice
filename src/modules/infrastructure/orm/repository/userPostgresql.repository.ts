import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import bcrypt from 'bcrypt';
import { ICreateUser, IUser } from '../../../domain/entities/user';
import jwt from 'jsonwebtoken';
import { SequelizePostgresqlConnection } from '../sequelizePostgresqlConnection';

dotenv.config();

export class UserPostgresqlRepository implements IUserRepository {
	private sequelize: Sequelize;

	constructor() {
		this.sequelize = SequelizePostgresqlConnection.getInstance();
	}

	async create(data: ICreateUser) {
		const user = (await this.sequelize.models.usuarios.create(data)).toJSON();

		return user as IUser;
	}

	async findByEmail(email: string) {
		const user = await this.sequelize.models.usuarios.findOne({ where: { correo: email } });
		let userJSON: IUser | null = null;
		if (user) {
			userJSON = user.toJSON() as IUser;
		}

		return userJSON;
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

	verifyJWT(token: string) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
			const payloadJSON = JSON.stringify(decoded);

			return { payload: payloadJSON, error: null };
		} catch (error) {
			return { payload: null, error: (error as Error).message };
		}
	}

	generateJWT(id: number, role: number) {
		try {
			const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY as string, {
				expiresIn: '720h',
			});

			return token;
		} catch (error) {
			throw new Error((error as Error).message);
		}
	}
}

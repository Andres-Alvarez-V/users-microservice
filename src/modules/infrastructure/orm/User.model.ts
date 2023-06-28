import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUser } from '../../domain/entities/user';

export const USER_TABLE = 'usuarios';
export const UserSchema = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	apellido: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	numero_documento: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	celular: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fecha_nacimiento: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	correo: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	clave: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	id_rol: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
};

export class User extends Model implements IUser {
	public id!: number;
	public nombre!: string;
	public apellido!: string;
	public numero_documento!: string;
	public celular!: string;
	public fecha_nacimiento!: Date;
	public correo!: string;
	public clave!: string;
	public id_rol!: number;

	static associate() {}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: USER_TABLE,
			timestamps: false,
		};
	}
}

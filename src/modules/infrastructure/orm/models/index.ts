import { UserPostgresql, UserPostgresqlSchema } from './UserPotgresql.model';
import { Sequelize } from 'sequelize';

export const setUpModels = (sequelize: Sequelize) => {
	UserPostgresql.init(UserPostgresqlSchema, UserPostgresql.config(sequelize));
};

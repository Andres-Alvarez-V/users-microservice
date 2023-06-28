// eslint-disable-next-line import/no-unresolved
import { IUser } from '../entities/user';

export interface IUserRepository {
	create(user: Omit<IUser, 'id'>): Promise<void>;
	findByEmail(email: string): Promise<unknown | null>;
	encryptPassword(password: string): Promise<string>;
	comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}

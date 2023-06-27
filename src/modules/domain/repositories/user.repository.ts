// eslint-disable-next-line import/no-unresolved
import { IUser } from '../entities/user';

export interface IUserRepository {
	create(user: Omit<IUser, 'id'>): Promise<void>;
}

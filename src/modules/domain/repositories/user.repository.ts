import { IUser } from '../entities/user';

export interface IUserRepository {
	create(user: Omit<IUser, 'id'>): Promise<IUser>;
	findByEmail(email: string): Promise<IUser | null>;
	encryptPassword(password: string): Promise<string>;
	comparePassword(password: string, receivedPassword: string): Promise<boolean>;
	findById(id: number): Promise<IUser | null>;
	verifyJWT(token: string):
		| {
				payload: string;
				error: null;
		  }
		| {
				payload: null;
				error: string;
		  };
	generateJWT(id: number, role: number): string;
}

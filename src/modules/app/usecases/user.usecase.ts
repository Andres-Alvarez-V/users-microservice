import { IUser } from '../../domain/entities/user';
import { RoleType } from '../../domain/enums/role-type.enum';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICreateUserDTO, ILoginUserDTO } from '../dtos/request/user.dto';
import { IUserRoleDTO } from '../dtos/response/user.dto';
import boom from '@hapi/boom';

export class UserUsecase {
	constructor(private readonly userRepository: IUserRepository) {}

	async create(data: ICreateUserDTO) {
		const encryptPassword = await this.userRepository.encryptPassword(data.clave);
		const newData: Omit<IUser, 'id'> = {
			...data,
			clave: encryptPassword,
			id_rol: RoleType.OWNER,
		};
		const newUser = await this.userRepository.create(newData);

		return newUser;
	}

	async findRoleById(id: number) {
		const user = await this.userRepository.findById(id);
		let role: null | IUserRoleDTO = null;
		if (user !== null) {
			role = { id_rol: user.id_rol };
		}

		return role;
	}

	async signIn(data: ILoginUserDTO) {
		const user = await this.userRepository.findByEmail(data.correo);
		let token: null | string = null;
		if (user === null) {
			throw boom.notFound('Usuario no encontrado');
		}

		const isMatch = await this.userRepository.comparePassword(data.clave, user.clave);
		if (!isMatch) {
			throw boom.unauthorized('Contraseña incorrecta');
		}

		token = this.userRepository.generateJWT(user.id, user.id_rol);

		return token;
	}
}

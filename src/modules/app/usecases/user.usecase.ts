import { IUser } from '../../domain/entities/user';
import { RoleType } from '../../domain/enums/role-type.enum';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { ICreateUserDTO } from '../dtos/request/user.dto';

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
}

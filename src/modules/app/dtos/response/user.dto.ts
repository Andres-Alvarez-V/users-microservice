import { IUser } from '../../../domain/entities/user';

export interface IUserRoleDTO extends Pick<IUser, 'id_rol'> {}

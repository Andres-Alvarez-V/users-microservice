import { UserUsecase } from '../app/usecases/user.usecase';
import { UserController } from './controllers/user.controllers';
import { UserPostgresqlRepository } from './orm/repository/userPostgresql.repository';

export const userRepository = new UserPostgresqlRepository();
const userUsecase = new UserUsecase(userRepository);
export const userController = new UserController(userUsecase);

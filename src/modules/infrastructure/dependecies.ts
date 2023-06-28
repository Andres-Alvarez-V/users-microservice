import { UserUsecase } from '../app/usecases/user.usecase';
import { UserController } from './controllers/user.controllers';
import { UserRepository } from './orm/user.repository';

export const userRepository = new UserRepository();
const userUsecase = new UserUsecase(userRepository);
export const userController = new UserController(userUsecase);

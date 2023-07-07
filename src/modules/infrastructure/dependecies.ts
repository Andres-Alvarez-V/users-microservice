import { UserUsecase } from '../app/usecases/user.usecase';
import { UserController } from './controllers/user.controllers';
import { PlazoletaMicroservice } from './microservices/plazoletaMicroservice';
import { UserPostgresqlRepository } from './orm/repository/userPostgresql.repository';

const plazoletaMicroservice = new PlazoletaMicroservice();
export const userRepository = new UserPostgresqlRepository();
const userUsecase = new UserUsecase(userRepository, plazoletaMicroservice);
export const userController = new UserController(userUsecase);

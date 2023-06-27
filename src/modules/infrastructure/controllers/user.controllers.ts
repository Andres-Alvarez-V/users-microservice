import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../../app/dtos/request/user.dto';
import { UserUsecase } from '../../app/usecases/user.usecase';
import { HttpCode } from '../../../helpers/enums/http-code.enum';

export class UserController {
	constructor(private readonly userUsecase: UserUsecase) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data: ICreateUserDTO = req.body;
			const newUser = await this.userUsecase.create(data);
			res.status(HttpCode.CREATED).json({
				message: 'Successfully created user',
				newUser,
			});
		} catch (error) {
			next(error);
		}
	}
}

import { Request, Response, NextFunction } from 'express';
import { ICreateUserDTO } from '../../app/dtos/request/user.dto';
import { UserUsecase } from '../../app/usecases/user.usecase';
import { HttpCode } from '../../../helpers/enums/http-code.enum';
import { IUserRoleDTO } from '../../app/dtos/response/user.dto';
import boom from '@hapi/boom';

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

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.query.id);
			if (isNaN(id)) {
				throw boom.badRequest('Invalid id');
			}
			const querySearch = req.query.querySearch as string;
			let answerData: null | IUserRoleDTO = null;
			if (querySearch === 'role') {
				answerData = await this.userUsecase.findRoleById(id);
			} else {
				throw boom.badRequest('Invalid query search');
			}
			res.status(HttpCode.OK).json(answerData);
		} catch (error) {
			next(error);
		}
	}

	async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body;
			const token = await this.userUsecase.signIn(data);
			res.status(HttpCode.OK).json({
				message: 'Successfully logged in',
				token,
			});
		} catch (error) {
			next(error);
		}
	}
}

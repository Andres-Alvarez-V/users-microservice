import dotenv from 'dotenv';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './modules/infrastructure/Endpoints';
import { swaggerDocs } from './adapters/doc/swagger.adapter';
import {
	boomErrorHandler,
	errorHandler,
	logErrors,
	ormErrorHandler,
} from './modules/infrastructure/middlewares/error.handler';

dotenv.config();
export class App {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(morgan('dev'));
		routes(this.app);
		this.app.use(logErrors);
		this.app.use(ormErrorHandler);
		this.app.use(boomErrorHandler);
		this.app.use(errorHandler);
	}

	public getInstance(): Application {
		return this.app;
	}

	public async run() {
		try {
			/**
			 * Initializing and connecting to database
			 */

			this.app.listen(process.env.PORT, () => {
				console.log(`[APP] - Application is running on port ${process.env.PORT}`);
				/**
				 * Setting documentation through OpenAPI (Swagger)
				 */
				swaggerDocs(this.app, process.env.PORT as unknown as number);
			});
		} catch (error) {
			console.error(error);
		}
	}
}

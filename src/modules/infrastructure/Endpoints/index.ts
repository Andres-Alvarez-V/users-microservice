import express from 'express';
import adminRouter from './admin.routes';
import userRouter from './user.routes';
import ownerRouter from './owner.routes';
import clientRouter from './client.routes';

function routes(app: express.Application) {
	const router = express.Router();
	app.get('/', (req, res) => {
		res.send('Hola mi server en express');
	});
	app.use('/api/v1', router);
	router.use('/admin', adminRouter);
	router.use('/propietario', ownerRouter);
	router.use('/user', userRouter);
	router.use('/cliente', clientRouter);
}

export default routes;

import { Router } from 'express';
import { userController } from '../dependecies';

const router = Router();

router.get('/', userController.findById.bind(userController));
export default router;

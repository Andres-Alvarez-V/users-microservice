import { Router } from 'express';
import { userController } from '../dependecies';

const router = Router();
/**
 * @openapi
 * /api/v1/user/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID and query
 *     description: |
 *       Get user details by ID and query parameters.
 *       Example: /api/v1/user?id=1&querySearch=role
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user ID
 *       - in: query
 *         name: querySearch
 *         schema:
 *           type: string
 *         required: true
 *         description: The query parameter
 *     responses:
 *       '200':
 *         description: "Successful Response"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessfulResponse'
 *       '400':
 *         description: "Missing data or with any wrong."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 * components:
 *   schemas:
 *     SuccessfulResponse:
 *         type: object
 *         properties:
 *             message:
 *               type: string
 *               example: successful confirmation message
 *     FailResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: http status code
 *         errorMessage:
 *           type: string
 *           example: fail message
 */
router.get('/', userController.findById.bind(userController));
export default router;

import AuthController from '@contollers/AuthController';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signUp', (req, res) => authController.sigup(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.get('/check', verifyTokenMiddleware, (req, res) =>
  AuthController.checkAuth(req, res),
);

export default authRouter;

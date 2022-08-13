import AuthController from '@contollers/AuthController';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import { signUpSchema, loginSchema } from '../schemas';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signUp', validateSchemaMiddleware(signUpSchema), (req, res) =>
  authController.sigup(req, res),
);
authRouter.post('/login', validateSchemaMiddleware(loginSchema), (req, res) =>
  authController.login(req, res),
);
authRouter.get('/check', verifyTokenMiddleware, (req, res) =>
  AuthController.checkAuth(req, res),
);

export default authRouter;

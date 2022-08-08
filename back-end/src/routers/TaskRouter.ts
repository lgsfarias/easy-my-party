import TaskController from '@contollers/TaskController';
import { Router } from 'express';
import verifyTokenMiddleware from 'src/middlewares/verifyTokenMiddleware';

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post('/', verifyTokenMiddleware, (req, res) =>
  taskController.create(req, res),
);

export default taskRouter;

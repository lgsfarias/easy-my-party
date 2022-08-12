import TaskController from '@contollers/TaskController';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post('/parties/:partyId/tasks', verifyTokenMiddleware, (req, res) =>
  taskController.create(req, res),
);

taskRouter.get('/parties/:partyId/tasks', verifyTokenMiddleware, (req, res) =>
  taskController.getAll(req, res),
);

taskRouter.get(
  '/parties/:partyId/tasks/done-percentage',
  verifyTokenMiddleware,
  (req, res) => taskController.getDonePercentage(req, res),
);

taskRouter.put(
  '/parties/:partyId/tasks/:taskId/finish',
  verifyTokenMiddleware,
  (req, res) => taskController.finishTask(req, res),
);

export default taskRouter;

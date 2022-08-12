import PartyController from '@contollers/PartyControler';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const partyRouter = Router();
const partyController = new PartyController();

partyRouter.post('/parties', verifyTokenMiddleware, (req, res) =>
  partyController.create(req, res),
);
partyRouter.get('/parties', verifyTokenMiddleware, (req, res) =>
  partyController.getAll(req, res),
);
partyRouter.get('/parties:id', verifyTokenMiddleware, (req, res) =>
  partyController.getById(req, res),
);
partyRouter.put('/parties:id', verifyTokenMiddleware, (req, res) =>
  partyController.update(req, res),
);

export default partyRouter;

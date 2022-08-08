import PartyController from '@contollers/PartyControler';
import { Router } from 'express';
import verifiTokenMiddleware from 'src/middlewares/verifyTokenMiddleware';

const partyRouter = Router();
const partyController = new PartyController();

partyRouter.post('/parties', verifiTokenMiddleware, (req, res) =>
  partyController.create(req, res),
);
partyRouter.get('/parties', verifiTokenMiddleware, (req, res) =>
  partyController.getAll(req, res),
);
partyRouter.get('/parties:id', verifiTokenMiddleware, (req, res) =>
  partyController.getById(req, res),
);
partyRouter.put('/parties:id', verifiTokenMiddleware, (req, res) =>
  partyController.update(req, res),
);

export default partyRouter;

import PartyController from '@contollers/PartyControler';
import { Router } from 'express';
import verifiTokenMiddleware from 'src/middlewares/verifyTokenMiddleware';

const partyRouter = Router();
const partyController = new PartyController();

partyRouter.post('/', verifiTokenMiddleware, (req, res) =>
  partyController.create(req, res),
);
partyRouter.get('/', verifiTokenMiddleware, (req, res) =>
  partyController.getAll(req, res),
);
partyRouter.get('/:id', verifiTokenMiddleware, (req, res) =>
  partyController.getById(req, res),
);
partyRouter.put('/:id', verifiTokenMiddleware, (req, res) =>
  partyController.update(req, res),
);

export default partyRouter;

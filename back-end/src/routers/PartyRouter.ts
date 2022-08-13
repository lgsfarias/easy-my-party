import PartyController from '@contollers/PartyControler';
import { Router } from 'express';
import verifySchema from 'src/middlewares/validateSchemaMiddleware';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';
import { createPartySchema, updatePartySchema } from '../schemas';

const partyRouter = Router();
const partyController = new PartyController();

partyRouter.post(
  '/parties',
  verifyTokenMiddleware,
  verifySchema(createPartySchema),
  (req, res) => partyController.create(req, res),
);
partyRouter.get('/parties', verifyTokenMiddleware, (req, res) =>
  partyController.getAll(req, res),
);
partyRouter.get('/parties:id', verifyTokenMiddleware, (req, res) =>
  partyController.getById(req, res),
);
partyRouter.put(
  '/parties:id',
  verifyTokenMiddleware,
  verifySchema(updatePartySchema),
  (req, res) => partyController.update(req, res),
);

export default partyRouter;

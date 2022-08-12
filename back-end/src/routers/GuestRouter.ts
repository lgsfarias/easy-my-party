import GuestController from '@contollers/GuestController';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware';

const guestRouter = Router();
const guestController = new GuestController();

guestRouter.post(
  '/parties/:partyId/guests',
  verifyTokenMiddleware,
  (req, res) => guestController.create(req, res),
);

guestRouter.get('/parties/:partyId/guests', verifyTokenMiddleware, (req, res) =>
  guestController.getAll(req, res),
);

guestRouter.get(
  '/parties/:partyId/guests/:guestId',
  verifyTokenMiddleware,
  (req, res) => guestController.getById(req, res),
);

guestRouter.put('/parties/:partyId/guests/:guestId/confirm', (req, res) =>
  guestController.confirm(req, res),
);

export default guestRouter;

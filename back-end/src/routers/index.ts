import { Router, Request, Response } from 'express';
import authRouter from './AuthRouter';
import partyRouter from './PartyRouter';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Easy my Party API');
});
router.use('/', authRouter);
router.use('/parties', partyRouter);

export default router;

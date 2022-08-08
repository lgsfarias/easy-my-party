import { Router, Request, Response } from 'express';
import authRouter from './AuthRouter';
import partyRouter from './PartyRouter';
import taskRouter from './TaskRouter';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Easy my Party API');
});
router.use(authRouter);
router.use(partyRouter);
router.use(taskRouter);

export default router;

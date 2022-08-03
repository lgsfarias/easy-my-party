import { Router, Request, Response } from 'express';
import authRouter from './AuthRouter';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Easy my Party API');
});
router.use('/', authRouter);

export default router;

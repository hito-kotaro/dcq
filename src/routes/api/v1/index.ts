import express, { Request, Response } from 'express';
import userRouter from './user';
import accountRouter from './account';

const router = express.Router();

// routerにルーティングの動作を書いてく
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello,world',
  });
});

router.use('/user', userRouter);
router.use('/account', accountRouter);

export default router;

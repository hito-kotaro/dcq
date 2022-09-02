import express, { Request, Response } from 'express';
import userRouter from './user';

const router = express.Router();

// routerにルーティングの動作を書いてく
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello,world',
  });
});

router.use('/user', userRouter);

export default router;

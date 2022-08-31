import express, { Request, Response } from 'express';
import user from './user';
const router = express.Router();

// routerにルーティングの動作を書いてく
router.get('/', function (req: Request, res: Response) {
  res.json({
    message: 'Hello,world',
  });
});

router.use('/user', user);

export default router;

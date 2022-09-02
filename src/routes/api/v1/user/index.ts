import { Request, Response } from 'express';
import type user from '../../../../types/models';

const express = require('express');
const models = require('../../../../db/models');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// user存在チェック emailを受け取って存在すればTしなければFを返す
const isExistUser = async (email: string) => {
  const result = await models.User.findAll({ where: { email } });
  console.log(result > 0);
  const isExist = result > 0;
  return isExist;
};

router.get('/test', async (_req: Request, res: Response) => {
  const isExist = await isExistUser('1');
  if (isExist) {
    // raiseする
    console.log(isExist);
    res.send('user already exist');
  } else {
    console.log(isExist);
    res.send('user not exist');
  }
});

// GET  http://localhost:3000/api/v1/user/
router.get('/', async (req: Request, res: Response) => {
  const result = await models.User.findAll();
  const users: user[] = [];
  result.map((u: user) => users.push(u));
  res.json(users);
});

router.post('/create', async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    point: 0,
  });
  res.send(result);
});

// routerをモジュールとして扱う準備
module.exports = router;
export default router;

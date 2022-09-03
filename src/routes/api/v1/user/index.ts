import express, { Request, Response } from 'express';
import { currentDate } from '../../../../utils/getDate';
import type { userType } from '../../../../types/models';

const models = require('../../../../db/models');

const router = express.Router();

type newUserType = Omit<userType, 'id' | 'created_at' | 'updated_at'>;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// user存在チェック emailを受け取って存在すればTしなければFを返す
const isExistUser = async (email: string) => {
  const result = await models.User.findAll({ where: { email } });
  console.log(result > 0);
  const isExist = result > 0;
  return isExist;
};

// fixme: SELECTで取得した時刻がUTCになってしまう。
// DBにはJSTでINSERTした時刻になっているが、sequerizeで取り出す時に変換されている？
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
  console.log(result);
  const users: userType[] = [];
  result.map((u: userType) => users.push(u));
  res.json(users);
});

router.post('/create', async (req: Request, res: Response) => {
  console.log(req.body);
  const postuser: newUserType = {
    name: req.body.name,
    password: req.body.name,
    point: 0,
    account_id: req.body.account_id,
    group_id: 1,
    role_id: 1,
  };

  const result = await models.User.create(postuser);
  res.send(result);
});

// routerをモジュールとして扱う準備
module.exports = router;
export default router;

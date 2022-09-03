import express, { Request, Response } from 'express';
import type { userType } from '../../../../types/models';

const models = require('../../../../db/models');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// fixme: SELECTで取得した時刻がUTCになってしまう。
// DBにはJSTでINSERTした時刻になっているが、sequerizeで取り出す時に変換されている？

// GET  http://localhost:3000/api/v1/user/
router.get('/', async (req: Request, res: Response) => {
  const result = await models.User.findAll();
  console.log(result);
  const users: userType[] = [];
  result.map((u: userType) => users.push(u));
  res.json(users);
});

// ユーザー作成
router.post('/create', async (req: Request, res: Response) => {
  models.User.findOrCreate({
    where: { name: req.body.name, account_id: req.body.account_id },
    defaults: req.body,
  }).then(([user, created]: any) => {
    if (created) {
      res.json({ status: 200, message: `created account ${req.body.nane}` });
    } else {
      res.json({
        status: 422,
        message: `account ${req.body.name} is already exist`,
      });
    }
  });
});

// ユーザーの削除
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  models.User.findOne({
    where: { id },
  }).then((user: any) => {
    if (user) {
      user.destroy();
      res.json({ status: 200, message: `delete succeeded ${user.name}` });
    } else {
      res.json({
        status: 422,
        message: 'delete failed. is not exist',
      });
    }
  });
});

// アカウントの更新
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const accountId = req.body.account_id;
  models.User.findOne({ where: { id, account_id: accountId } }).then(
    (user: any) => {
      if (user) {
        // パスワードとユーザー名のどちらを更新するか判定して更新する。
        if (req.body.name) {
          user.name = req.body.name;
          res.json({ status: 200, message: 'update user name' });
        } else if (req.body.password) {
          user.password = req.body.password;
          res.json({ status: 200, message: 'update password' });
        }
        user.save();
      } else {
        res.json({ status: 422, message: 'user not exist' });
      }
    },
  );
});

export default router;

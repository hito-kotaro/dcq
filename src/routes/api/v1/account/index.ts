import express, { Request, Response } from 'express';

const models = require('../../../../db/models');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// account一覧取得
router.get('/', async (_req: Request, res: Response) => {
  const result = await models.Accounts.findAll();
  console.log(result);
  res.send(result);
});

// アカウントの作成
router.post('/create', async (req: Request, res: Response) => {
  models.Accounts.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body,
  }).then(([account, created]: any) => {
    if (created) {
      res.json({ status: 200, message: `created account ${req.body.email}` });
    } else {
      res.json({
        status: 422,
        message: `account ${req.body.email} is already exist`,
      });
    }
  });
});

// アカウントの更新
router.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  models.Accounts.findOne({ where: { id } }).then((account: any) => {
    if (account) {
      res.json({ status: 200, message: 'ok exist' });
    } else {
      res.json({ status: 422, message: 'no exist' });
    }
  });
});

// アカウントの削除
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  models.Accounts.findOne({
    where: { id },
  }).then((account: any) => {
    if (account) {
      account.destroy();
      res.json({ status: 200, message: `delete succeeded ${account.email}` });
    } else {
      res.json({
        status: 422,
        message: 'delete failed. is not exist',
      });
    }
  });
});

export default router;

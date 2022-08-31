const express = require('express');
const router = express.Router();
const models = require('../../../../db/models');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// user存在チェック emailを受け取って存在すればTしなければFを返す
const isExistUser = async (email) => {
  const result = await models.User.findAll({ where: { email: email } });
  console.log(result > 0 ? true : false);
  const isExist = result > 0 ? true : false;
  return isExist;
};

router.get('/test', async (req, res) => {
  const isExist = await isExistUser(1);
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
router.get('/', async (req, res) => {
  const result = await models.User.findAll();
  let users = [];
  result.map((u) => {
    console.log(u.name);
    users.push(u.name);
  });
  res.json(users);
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  const result = await models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    point: 0,
  });
  res.send(result);
});

//routerをモジュールとして扱う準備
module.exports = router;

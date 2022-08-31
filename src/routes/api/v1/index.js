const express = require('express');
// ルーティングするで
const router = express.Router();
router.use('/user', require('./user/user.js'));

// test用ルーティング
router.get('/', function (req, res) {
  res.json({
    message: 'Hello,world',
  });
});

//routerをモジュールとして扱う準備
module.exports = router;

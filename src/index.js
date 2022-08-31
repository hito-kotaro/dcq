require('dotenv').config();
const express = require('express');
// const router = express.Router();

const app = express();

const router = require('./routes/api/v1');
app.use('/api/v1/', router);

// サーバー起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('listen on port:', port);
});

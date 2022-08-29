require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

// サーバー起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('listen on port:', port);
});

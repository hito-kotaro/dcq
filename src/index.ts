require('dotenv').config();
import express, { Request, Response } from 'express';
import router from './routes/api/v1';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('hello');
});

// サーバー起動
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('listen on port:', port);
});

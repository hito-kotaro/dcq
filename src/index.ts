import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import router from './routes/api/v1';

require('dotenv').config();

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

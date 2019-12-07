import express from 'express';
import './db/mongoose';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¯\\_(ツ)_/¯');
});

export default app;
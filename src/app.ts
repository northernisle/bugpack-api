import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import registerRoutes from './api';
import './loaders';
import { RequestError } from './models/requestError';

const app = express();

app.use(express.json());
app.use(cors());

registerRoutes(app);

app.use((req, res, next) => {
  next (new RequestError(404, 'Not Found'));
});

app.use((err: RequestError, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 401) {
    return res.status(err.status).send();
  }
  
  return next(err);
});

app.use((err: RequestError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status);

  let message = err.message;

  if (status === 500) {
    message = 'Something went wrong 🤷'
  }

  if (!message) {
    return res.send();
  }

  return res.json({ errors: { message } });
});

export default app;
import { Router } from 'express';
import UserService from '../../services/user';

const router = Router();

router.post('/users', async (req, res, next) => {
  try {
    const user = await UserService.register(req.body);

    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
});

export default router;
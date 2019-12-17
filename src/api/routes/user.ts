import { Router } from 'express';
import userService from '../../services/user';
import auth from '../middleware/auth';

const router = Router();

router.get('/users/me', auth, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    next(e);
  }
});

router.post('/users/emailOccupied', async (req, res, next) => {
  try {
    const result = await userService.emailOccupied(req.body.email);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.post('/users/login', async (req, res, next) => {
  try {
    const { user, token } = await userService.signIn(req.body);

    res.send({ user, token });
  } catch (e) {
    next(e);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { user, token } = await userService.register(req.body);

    res.status(201).send({ user, token });
  } catch (e) {
    next(e);
  }
});

router.get('/users/logout', auth, async (req, res, next) => {
  try {
    await userService.signOut(req.user, req.token);

    res.send();
  } catch (e) {
    next(e);
  }
});

export default router;
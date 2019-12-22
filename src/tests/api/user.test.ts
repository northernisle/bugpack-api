import request from 'supertest';
import app from '../../app';
import User from '../../models/mongoose/user';
import connectDB from '../../loaders';
import { initDatabase, dbUserId, dbUser } from '../fixtures/db';

beforeAll(async () => await connectDB(<string>process.env.DB_TEST_NAME));

beforeEach(initDatabase);

test('Should create a new user', async () => {
  const name = 'Sir Hammerlock';
  const email = 'hammerlock@gentlemen.com'
  const password = 'hunter-scholar-gentleman';

  const res = await request(app).post('/users').send({
    name,
    email,
    password
  }).expect(201);

  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();

  expect(res.body).toMatchObject({
    user: {
      name,
      email
    },
    token: user?.tokens[0].token
  });

  expect(user?.password).not.toBe(password);
});
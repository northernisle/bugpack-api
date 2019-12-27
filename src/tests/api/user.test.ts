import request from 'supertest';
import app from '../../app';
import User from '../../models/mongoose/user';
import connectDB from '../../loaders';
import { initDatabase, dbUserId, dbUser } from '../fixtures/db';
import jwt from '../../services/jwt';

beforeAll(async () => await connectDB(<string>process.env.DB_TEST_NAME));

beforeEach(initDatabase);

test('Should create a new user', async () => {
  const name = 'Sir Hammerlock';
  const email = 'hammerlock@gentlemen.com'
  const password = 'hunter-scholar-gentleman';

  const res = await request(app)
    .post('/users')
    .send({
      name,
      email,
      password
    })
    .expect(201);

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

test('Should sign in existing user', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      email: dbUser.email,
      password: dbUser.password
    })
    .expect(200);

  let user = await User.findById(dbUserId);
  expect(user).not.toBeNull();

  const dbToken = user?.tokens[1].token;
  expect(res.body.token).toBe(dbToken);
});

test('Should NOT sign in wrong credentials', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'katagawa@maliwan.com',
      password: 'Zanara'
    }).expect(400);
});

test('Should sign out an authenticated user', async () => {
  await request(app)
    .get('/users/logout')
    .set('Authorization', `Bearer ${dbUser.tokens[0].token}`)
    .expect(200);

  const user = await User.findById(dbUserId);
  expect(user?.tokens[0]).toBeUndefined();
});

test('Should NOT sign out an unauthenticated user', async () => {
  await request(app)
    .get('/users/logout')
    .expect(401);
});

test('Should return the data for an authenticated user', async () => {
  const res = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${dbUser.tokens[0].token}`)
    .send()
    .expect(200);

  expect(res.body).toMatchObject({
    data: {
      _id: dbUser._id.toHexString(),
      name: dbUser.name,
      email: dbUser.email
    },
    token: null
  });
});

test('Should NOT return the data for an unauthenticated user', async () => {
  const res = await request(app)
    .get('/users/me')
    .send()
    .expect(401);

  expect(res.body).toMatchObject({});
});

test('Should return the unavailability of an occupied email', async () => {
  const res = await request(app)
    .post('/users/emailOccupied')
    .send({
      email: dbUser.email
    })
    .expect(200);

  expect(res.body).toBe(true);
});

test('Should return the availability of an email', async () => {
  const res = await request(app)
    .post('/users/emailOccupied')
    .send({
      email: 'hammerlock@gentlemen.com'
    })
    .expect(200);

  expect(res.body).toBe(false);
});
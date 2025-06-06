import app from '../server/app.js';
import supertest from 'supertest';
import { dbConnect, dbDrop, getAuthCookie } from './utils.js';

const request = supertest(app);

beforeAll(dbConnect);
afterAll(dbDrop);

let authCookie;
let users;

describe('POST Auth', () => {
  test('require authentication', async () => {
    await request.get('/user/me').expect(401);
  });
  test('register a user', async () => {
    await request
      .post('/user/register')
      .send({
        email: 'jan@kowalsky.pl',
        password: 'iamironman',
        firstName: 'Jan',
        lastName: 'Kowalsky',
      })
      .expect(201, { message: 'Registered! Authenticated.' });
  });
  test('login a user', async () => {
    const res = await request
      .post('/user/login')
      .send({
        email: 'jan@kowalsky.pl',
        password: 'iamironman',
      })
      .expect(200, { message: 'Logged in! Authenticated.' });
    authCookie = getAuthCookie(res);
  });
  test('should be authenticated', async () => {
    await request.get('/user/me').set('Cookie', authCookie).expect(200);
  });
});

describe('Users', () => {
  test('Get users', async () => {
    await request.post('/user/register').send({
      phone: '987654321',
      password: 'iamnotironman',
      firstName: 'Khan',
      lastName: 'Jowalsky',
    });
    const res = await request
      .get('/user')
      .set('Cookie', authCookie)
      .expect(200);
    users = res.body;
    console.log(users);
  });
});

// describe('Requests', () => {
//   let mjolnirID;
//   test('POST create', async () => {
//     const res = await request
//       .post('/request')
//       .set('Cookie', authCookie)
//       .send({
//         title: 'Mjolnir',
//         emoji: '🔨',
//         note: 'Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.',
//         users: users,
//       })
//       .expect(201);
//     mjolnirID = res.body._id;
//   });
//   test('PUT update', async () => {
//     await request
//       .put('/request')
//       .set('Cookie', authCookie)
//       .send({
//         documents: mjolnirID,
//         filter: {},
//         update: {
//           title: 'Jonathan',
//           note: 'No, no, no, give me that, you have the little one.',
//         },
//       })
//       .expect(201);
//   });
//   test('GET get', async () => {
//     const res = await request
//       .get('/request')
//       .set('Cookie', authCookie)
//       .expect(200);
//     expect(res.body[0].title).toBe('Jonathan');
//   });
//   test('DELETE delete', async () => {
//     await request
//       .delete('/request')
//       .set('Cookie', authCookie)
//       .send({ documents: mjolnirID })
//       .expect(200);
//   });
// });

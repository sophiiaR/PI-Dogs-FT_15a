/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Sawert',
  height: '20-30',
  weight: '10-12',
  life_span: '6-7',
  temperament: [4,9,14],
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jUGCKLmLDxoHi7eUg7da2EZ4snuIV9MeZw&usqp=CAU'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs/:id', () => {
    it('should get 200 if the dog exists', () =>
      agent.get('/dogs/1').expect(200)
    );
  });
});

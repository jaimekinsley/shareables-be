const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Bird = require('../lib/models/Bird');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();
  beforeAll(() => {
    return mongo.getUri()
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close()
    .then(()=>mongo.stop());
  });

  it('creates a new bird', () => {
    return request(app)
      .post('/birds')
      .send({ bird: 'barn owl', season: 'summer' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          bird: 'barn owl',
          season: 'summer',
          spotted: 1,
          __v: 0
        });
      });
  });

  it('gets a list of birds', async() => {
    await Bird.create({
      bird: 'sparrow',
      season: 'fall'
    });

    return request(app)
      .get('/birds')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.anything(),
            bird: 'sparrow',
            season: 'fall',
            spotted: 1,
            __v: 0
          }
        ]);
      });
  });

  it('gets a bird by id', async() => {
    const { _id } = await Bird.create({
      bird: 'raven',
      season: 'winter'
    });

    return request(app)
      .get(`/birds/${_id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: _id.toString(),
          bird: 'raven',
          season: 'winter',
          spotted: 1,
          __v: 0
        });
      });
  });

  it('deletes a bird by id', async() => {
    const { _id } = await Bird.create({
      bird: 'blue jay',
      season: 'spring'
    });

    return request(app)
      .delete(`/birds/${_id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: _id.toString(),
          bird: 'blue jay',
          season: 'spring',
          spotted: 1,
          __v: 0
        });
      });
  });

  it('updates a bird by id', async() => {
    const { _id } = await Bird.create({
      bird: 'blue jay',
      season: 'spring'
    });

    const birdUpdate = {
      bird: 'cardinal',
      season: 'summer'
    };

    return request(app)
      .patch(`/birds/${_id}`)
      .send(birdUpdate)
      .then(res => {
        expect(res.body).toEqual({
          _id: _id.toString(),
          bird: 'cardinal',
          season: 'summer',
          spotted: 1,
          __v: 0
        });
      });
  });

});

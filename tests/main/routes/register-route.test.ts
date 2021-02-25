import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/external/repositories/mongodb/helper/mongo-helper'

describe('register route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  it('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .post('/api/register')
      .send({
        name: 'My Name',
        email: 'myemail@email.com'
      })
      .expect(201)
  })
})

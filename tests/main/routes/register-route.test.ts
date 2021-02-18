import request from 'supertest'
import app from '@/main/config/app'

describe('register route', () => {
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
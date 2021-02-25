import { MongoHelper } from '@/external/repositories/mongodb/helper/mongo-helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb/mongodb-user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  it('should add user', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'My Name',
      email: 'myemail@email.com'
    }
    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })

  it('should return all added users', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'My Name1',
      email: 'myemail1@email.com'
    })
    await userRepository.add({
      name: 'My Name2',
      email: 'myemail2@email.com'
    })

    const users = await userRepository.findAllUsers()

    expect(users[0].name).toBe('My Name1')
    expect(users[1].name).toBe('My Name2')
  })
})

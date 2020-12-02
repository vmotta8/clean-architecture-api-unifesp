import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  it('should return user if it is found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({
      email: 'any@email.com',
      name: 'Any'
    })
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user.name).toBe('Any')
  })
})

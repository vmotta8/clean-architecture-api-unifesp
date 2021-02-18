import { UserData } from '@/entities'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('In memory user repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  it('should return user if it is found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    await sut.add({
      email: 'any@email.com',
      name: 'Any'
    })
    const user = await sut.findUserByEmail('any@email.com')
    expect(user.name).toBe('Any')
  })

  it('should return all users', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    await sut.add({
      email: 'any@email.com',
      name: 'Any'
    })
    await sut.add({
      email: 'any2@email.com',
      name: 'Any2'
    })
    const allUsers = await sut.findAllUsers()
    expect(allUsers.length).toBe(2)
  })
})

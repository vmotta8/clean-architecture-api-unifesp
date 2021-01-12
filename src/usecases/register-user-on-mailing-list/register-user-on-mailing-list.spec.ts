import { UserData } from '../../entities/user-data'
import { UserRepository } from './ports/user-repository'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

describe('Register user on mailing list', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'Vinicius'
    const email = 'vinicius@email.com'

    const response = await usecase.registerUserOnMailingList({ name, email })

    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe(name)
    expect(response.value.name).toBe(name)
  })
})

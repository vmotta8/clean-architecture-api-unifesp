import { UserData } from '../../entities/user-data'
import { UserRepository } from './ports/user-repository'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { left } from '../../shared/either'

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

  it('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'Vinicius'
    const invalidEmail = 'viniciusemail.com'

    const response = await usecase.registerUserOnMailingList({ name: name, email: invalidEmail })

    const user = repo.findUserByEmail(invalidEmail)
    expect((await user)).toBe(null)
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})

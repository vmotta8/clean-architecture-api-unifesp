import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'

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

    const response = (await usecase.registerUserOnMailingList({ name: name, email: invalidEmail })).value as Error

    const user = repo.findUserByEmail(invalidEmail)
    expect((await user)).toBe(null)
    expect(response.name).toEqual('InvalidEmailError')
  })

  it('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const invalidName = ' '
    const email = 'vinicius@email.com'

    const response = (await usecase.registerUserOnMailingList({ name: invalidName, email: email })).value as Error

    const user = repo.findUserByEmail(email)
    expect((await user)).toBe(null)
    expect(response.name).toEqual('InvalidNameError')
  })
})

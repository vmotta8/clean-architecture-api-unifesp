import { UserRepository } from '../../../../src/usecases/register-user-on-mailing-list/ports'
import { UserData } from '../../../../src/entities'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]
  constructor (
    users: UserData[]
  ) {
    this.repository = users
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      (this.repository).push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const found = this.repository.find(user => user.email === email)
    return found || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<Boolean> {
    if (await this.findUserByEmail(user.email) == null) {
      return false
    }

    return true
  }
}

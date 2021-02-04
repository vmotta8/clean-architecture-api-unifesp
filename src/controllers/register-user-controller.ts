/* eslint-disable no-useless-constructor */
import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest } from './ports'
import { badRequest, created } from './util'

export class RegisterUserController {
  constructor (
    private readonly usecase: RegisterUserOnMailingList
  ) {}

  public async handle (request: HttpRequest) {
    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }
    if (response.isRight()) {
      return created(response.value)
    }
  }
}

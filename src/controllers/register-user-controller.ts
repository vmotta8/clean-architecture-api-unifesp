/* eslint-disable no-useless-constructor */
import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { MissingParamError } from './errors/missing-param-error'
import { HttpRequest } from './ports'
import { badRequest, created } from './util'

export class RegisterUserController {
  constructor (
    private readonly usecase: RegisterUserOnMailingList
  ) {}

  public async handle (request: HttpRequest) {
    if (!request.body.name || !request.body.email) {
      let missingParam = !(request.body.name) ? 'name ' : ''
      missingParam += !(request.body.email) ? 'email' : ''

      return badRequest(new MissingParamError(missingParam.trim()))
    }

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

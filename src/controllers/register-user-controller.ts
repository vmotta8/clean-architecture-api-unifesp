/* eslint-disable no-useless-constructor */
import { UserData } from '@/entities'
import { UseCase } from '@/usecases/ports'
import { MissingParamError } from './errors/missing-param-error'
import { HttpRequest } from './ports'
import { badRequest, created, serverError } from './util'

export class RegisterUserController {
  constructor (
    private readonly usecase: UseCase
  ) {}

  public async handle (request: HttpRequest) {
    try {
      if (!request.body.name || !request.body.email) {
        let missingParam = !(request.body.name) ? 'name ' : ''
        missingParam += !(request.body.email) ? 'email' : ''

        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }
      if (response.isRight()) {
        return created(response.value)
      }
    } catch (err) {
      return serverError(err)
    }
  }
}

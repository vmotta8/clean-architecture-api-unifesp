import { RegisterUserController } from '@/controllers'
import { HttpRequest } from '@/controllers/ports'
import { Request, Response } from 'express'

export const adaptRout = (controller: RegisterUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

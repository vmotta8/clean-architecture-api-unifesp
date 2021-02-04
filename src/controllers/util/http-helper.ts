import { HttpResponse } from '../ports'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (data: Error): HttpResponse => ({
  statusCode: 400,
  body: data
})

export const serverError = (data: Error): HttpResponse => ({
  statusCode: 500,
  body: data
})

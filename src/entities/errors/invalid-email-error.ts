export class InvalidEmailError extends Error {
  public readonly name = 'InvalidEmailError'

  constructor (invalidEmail: string) {
    super('Invalid email: ' + invalidEmail)
  }
}

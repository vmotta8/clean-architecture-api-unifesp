export class InvalidNameError extends Error {
  public readonly name = 'InvalidNameError'

  constructor (invalidName: string) {
    super('Invalid name: ' + invalidName)
  }
}

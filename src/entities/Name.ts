import { Either, left, right } from '../shared'
import { InvalidNameError } from './errors'

export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  public static create (name: string): Either<InvalidNameError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name))
    }

    return left(new InvalidNameError(name))
  }

  public static validate (name: string): boolean {
    if (!name) {
      return false
    }

    if (name.trim().length < 2 || name.trim().length > 256) {
      return false
    }

    return true
  }
}

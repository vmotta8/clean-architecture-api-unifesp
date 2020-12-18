import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { User } from './user'

describe('User domain entity', () => {
  it('should not create user with invalid email address', () => {
    const invalidEmail = 'invalidEmail'
    const error = User.create({ name: 'My Name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})

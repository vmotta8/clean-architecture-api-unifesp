import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

describe('User domain entity', () => {
  it('should not create user with invalid email address', () => {
    const invalidEmail = 'invalidEmail'
    const error = User.create({ name: 'My Name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it('should not create user with invalid name too few', () => {
    const invalidName = 'O     '
    const error = User.create({
      name: invalidName,
      email: 'myname@email.com'
    })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  it('should not create user with invalid name too many', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({
      name: invalidName,
      email: 'myname@email.com'
    })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})

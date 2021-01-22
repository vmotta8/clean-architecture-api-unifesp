import { User } from '@/entities'

describe('User domain entity', () => {
  it('should not create user with invalid email address', () => {
    const invalidEmail = 'invalidEmail'
    const error = User.create({
      name: 'My Name',
      email: invalidEmail
    }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('Invalid email: ' + invalidEmail)
  })

  it('should not create user with invalid name too few', () => {
    const invalidName = 'O     '
    const error = User.create({
      name: invalidName,
      email: 'myname@email.com'
    }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName)
  })

  it('should not create user with invalid name too many', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({
      name: invalidName,
      email: 'myname@email.com'
    }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName)
  })

  it('should create user with a valid data', () => {
    const validName = 'My Name'
    const validEmail = 'myname@email.com'
    const user: User = User.create({
      name: validName,
      email: validEmail
    }).value as User

    expect(user.name).toEqual({ name: validName })
    expect(user.email).toEqual({ email: validEmail })
  })
})

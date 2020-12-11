import { Email } from './Email'

describe('email validation', () => {
  it('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept undefined strings', () => {
    const email: string = undefined
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept empty strings', () => {
    const email: string = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should accept valid email', () => {
    const email: string = 'myname@email.com'
    expect(Email.validate(email)).toBeTruthy()
  })
})

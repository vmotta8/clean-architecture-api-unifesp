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

  it('should not accept local part larger than 64 chars', () => {
    const email: string = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept domain larger than 255 chars', () => {
    const email: string = 'local@' + 'd'.repeat(260) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept strings larger than 320 chars', () => {
    const email: string = 'l'.repeat(64) + '@' + 'c'.repeat(128) + '.' + 'd'.repeat(128)
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept empty local part', () => {
    const email: string = '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept empty domain', () => {
    const email: string = 'myname@'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept domain with a part larger than 63 chars', () => {
    const email: string = 'myname@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept empty local part with invalid char', () => {
    const email: string = 'my name@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})

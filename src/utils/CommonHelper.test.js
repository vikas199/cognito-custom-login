import {customErrorMessage} from '../utils/CommonHelper'
describe('Return custom error messages comparing default error messages from the amazon cognito', () => {
  it('displays custom message when both email is empty', () => {
    const input = 'Missing required parameter USERNAME'
    const output = 'Email is required.'
    expect(customErrorMessage(input)).toEqual(output)
  })

  it('displays custom error message when user is expired', () => {
    const input = 'User account has expired, it must be reset by an administrator.'
    const output = 'Your temporary password has expired and must be reset by an administrator.'
    expect(customErrorMessage(input)).toEqual(output)
  })

  it('displays default error message', () => {
    const input = 'some message'
    const output = 'some message'
    expect(customErrorMessage(input)).toEqual(output)
  })
})

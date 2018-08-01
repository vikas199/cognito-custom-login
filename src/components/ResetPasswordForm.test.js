import React from 'react'
import { shallow } from 'enzyme'
import ResetPasswordForm from './ResetPasswordForm'
import ErrorMessage from './ErrorMessage'

describe('ResetPasswordForm.js Tests', () => {
  it('should require correct params', () => {
    let mock = jest.fn()

    // eslint-disable-next-line no-console
    console.error = mock

    shallow(<ResetPasswordForm/>)

    expect(mock).toHaveBeenCalledTimes(8)
    let concat = [].concat(...mock.mock.calls)

    expect(concat.some((element) => { return element.includes('`email` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`code` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`newPassword` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`confirmPassword` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onCodeChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onNewPasswordChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onConfirmPasswordChange` is marked as required') })).toBe(true)
    expect(concat.some((element) => { return element.includes('`onSubmit` is marked as required') })).toBe(true)
  })

  it('should display `Password Reset` at top', () => {
    const wrapper = shallow(<ResetPasswordForm/>)

    let h1 = wrapper.find('h1')

    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('Password Reset')
  })

  it('should pass errorMsg to <ErrorMessage>', () => {
    const wrapper = shallow(<ResetPasswordForm errorMsg="some_message"/>)

    let errorMessageTag = wrapper.find(ErrorMessage)
    expect(errorMessageTag).toHaveLength(1)
    expect(errorMessageTag.props().msg).toEqual('some_message')
  })

  describe('instructions Tests', () => {
    it('should display instructions', () => {
      const wrapper = shallow(<ResetPasswordForm email="a@test.com"/>)

      let span = wrapper.find('span')

      expect(span).toHaveLength(3)
      expect(span.at(0).text()).toEqual('Please check your email')
      expect(span.at(1).text()).toEqual('We have sent a password reset code by email to a@test.com. Enter it below to reset your password.')
    })
  })

  describe('code input Tests', () => {
    let mockToVerify = jest.fn()
    let mock = jest.fn()
    let wrapper = shallow(<ResetPasswordForm email="a@test.com" code="the_code" newPassword="" confirmPassword=""
      onCodeChange={mockToVerify} onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains label', () => {
      let label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(0).text()).toEqual('Code')
    })

    it('contains text input for code', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().id).toEqual('forgot_password_code')
    })

    it('lets component manage code value', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().value).toEqual('the_code')
    })

    it('has type of password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().onChange).toEqual(mockToVerify)
    })
  })

  describe('new password input Tests', () => {
    let mockToVerify = jest.fn()
    let mock = jest.fn()
    let wrapper = shallow(<ResetPasswordForm email="a@test.com" code="the_code" newPassword="new_password" confirmPassword=""
      onCodeChange={mock} onNewPasswordChange={mockToVerify} onConfirmPasswordChange={mock} onSubmit={mock}/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains label', () => {
      let label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(1).text()).toEqual('Create Password')
    })

    it('contains text input for new password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().id).toEqual('new_password')
    })

    it('lets component manage new password value', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().value).toEqual('new_password')
    })

    it('has type of password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().onChange).toEqual(mockToVerify)
    })
  })

  describe('confirm password input Tests', () => {
    let mockToVerify = jest.fn()
    let mock = jest.fn()
    let wrapper = shallow(<ResetPasswordForm email="a@test.com" code="the_code" newPassword="new_password" confirmPassword="confirm_password"
      onCodeChange={mock} onNewPasswordChange={mock} onConfirmPasswordChange={mockToVerify} onSubmit={mock}/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains label', () => {
      let label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(2).text()).toEqual('Confirm New Password Again')
    })

    it('contains text input for confirm password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().id).toEqual('confirm_password')
    })

    it('lets component manage confirm password value', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().value).toEqual('confirm_password')
    })

    it('has type of password', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      let input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().onChange).toEqual(mockToVerify)
    })
  })

  describe('submit button Tests', () => {
    let mockToVerify = jest.fn()
    let mock = jest.fn()
    let wrapper = shallow(<ResetPasswordForm email="a@test.com" code="the_code" newPassword="new_password" confirmPassword="confirm_password"
      onCodeChange={mock} onNewPasswordChange={mock} onConfirmPasswordChange={mock} onSubmit={mockToVerify}/>)

    afterEach(() => {
      mockToVerify.mockReset()
    })

    it('contains submit button', () => {
      let button = wrapper.find('button')

      expect(button).toHaveLength(1)
    })

    it('has correct text on submit button', () => {
      let button = wrapper.find('button')

      expect(button.text()).toEqual('Change Password')
    })

    it('calls correct callback onClick', () => {
      let button = wrapper.find('button')

      expect(button).toHaveLength(1)
      expect(button.props().onClick).toEqual(mockToVerify)
    })
  })
})

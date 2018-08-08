import React from 'react'
import { shallow } from 'enzyme'
import ResetPasswordForm from './ResetPasswordForm'
import ErrorMessage from './ErrorMessage'
import * as Auth from '../utils/Auth'

describe('ResetPasswordForm.js Tests', () => {
  const event = { preventDefault: () => {} }

  it('should require correct params', () => {
    const mock = jest.fn()

    // eslint-disable-next-line no-console
    console.error = mock

    shallow(<ResetPasswordForm/>)

    expect(mock).toHaveBeenCalledTimes(1)
    const concat = [].concat(...mock.mock.calls)

    expect(concat.some((element) => { return element.includes('`email` is marked as required') })).toBe(true)
  })

  it('should display `Password Reset` at top', () => {
    const wrapper = shallow(<ResetPasswordForm/>)

    const h1 = wrapper.find('h1')

    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('Password Reset')
  })

  it('should pass errorMsg to <ErrorMessage>', () => {
    const wrapper = shallow(<ResetPasswordForm errorMsg="some_message"/>)

    const errorMessageTag = wrapper.find(ErrorMessage)
    expect(errorMessageTag).toHaveLength(1)
    expect(errorMessageTag.props().msg).toEqual('some_message')
  })

  describe('instructions Tests', () => {
    it('should display instructions', () => {
      const wrapper = shallow(<ResetPasswordForm email="a@test.com"/>)

      const span = wrapper.find('span')
      const div = wrapper.find('div')

      expect(span).toHaveLength(1)
      expect(div).toHaveLength(2)
      expect(div.at(1).text()).toEqual('Please check your email.')
      expect(span.at(0).text()).toEqual('We have sent a password reset code by email to a@test.com. Enter it below to reset your password.')
    })
  })

  describe('code input Tests', () => {
    const wrapper = shallow(<ResetPasswordForm email="a@test.com" />)

    it('contains label', () => {
      const label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(0).text()).toEqual('Code')
    })

    it('contains text input for code', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().id).toEqual('forgot_password_code')
    })

    it('lets component manage code value', () => {
      wrapper.setState({code: 'the_code'})

      expect(wrapper.find('#forgot_password_code').props().value).toEqual('the_code')
    })

    it('has type of password', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(0).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      const input = wrapper.find('input')
      const instance = wrapper.instance()

      expect(input).toHaveLength(3)
      expect(input.at(0).props().onChange).toEqual(instance.updateCodeState)
    })

    it('sets code on updateCodeState', () => {
      const instance = wrapper.instance()

      instance.updateCodeState({ target: { value: 'the_code' } })
      expect(wrapper.state().code).toEqual('the_code')
    })
  })

  describe('new password input Tests', () => {
    const wrapper = shallow(<ResetPasswordForm email="a@test.com" />)

    it('contains label', () => {
      const label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(1).text()).toEqual('Create Password')
    })

    it('contains text input for new password', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().id).toEqual('new_password')
    })

    it('lets component manage new password value', () => {
      wrapper.setState({newPassword: 'the_new_password'})

      expect(wrapper.find('#new_password').props().value).toEqual('the_new_password')
    })

    it('has type of password', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(1).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      const input = wrapper.find('input')

      const instance = wrapper.instance()

      expect(input).toHaveLength(3)
      expect(input.at(1).props().onChange).toEqual(instance.updateNewPasswordState)
    })

    it('sets new password on updateNewPasswordState', () => {
      const instance = wrapper.instance()
      instance.updateNewPasswordState({ target: { value: 'password' } })

      expect(wrapper.state().newPassword).toEqual('password')
    })
  })

  describe('confirm password input Tests', () => {
    const wrapper = shallow(<ResetPasswordForm email="a@test.com" />)

    it('contains label', () => {
      const label = wrapper.find('label')

      expect(label).toHaveLength(3)
      expect(label.at(2).text()).toEqual('Confirm New Password Again')
    })

    it('contains text input for confirm password', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().id).toEqual('confirm_password')
    })

    it('lets component manage confirm password value', () => {
      wrapper.setState({confirmPassword: 'the_confirm_password'})

      expect(wrapper.find('#confirm_password').props().value).toEqual('the_confirm_password')
    })

    it('has type of password', () => {
      const input = wrapper.find('input')

      expect(input).toHaveLength(3)
      expect(input.at(2).props().type).toEqual('password')
    })

    it('calls correct callback onChange', () => {
      const input = wrapper.find('input')

      const instance = wrapper.instance()

      expect(input).toHaveLength(3)
      expect(input.at(2).props().onChange).toEqual(instance.updateConfirmPasswordState)
    })

    it('sets conform password on updateConfirmPasswordState', () => {
      const instance = wrapper.instance()
      instance.updateConfirmPasswordState({ target: { value: 'password' } })

      expect(wrapper.state().confirmPassword).toEqual('password')
    })
  })

  describe('changePassword Tests', () => {
    let mockConfirmPassword = jest.fn()
    let cognitoUser = {
      confirmPassword: mockConfirmPassword
    }

    let mockAuthCreateUser = jest.fn()

    beforeEach(() => {
      // eslint-disable-next-line
            Auth.createUser = mockAuthCreateUser;
      cognitoUser = {
        confirmPassword: mockConfirmPassword
      }
      mockAuthCreateUser.mockReturnValue(cognitoUser)
    })

    afterEach(() => {
      mockConfirmPassword.mockReset()
      mockAuthCreateUser.mockReset()
    })

    it('shows error when passwords do not match', () => {
      const mockShowError = jest.fn()

      const wrapper = shallow(<ResetPasswordForm showError={mockShowError}/>)

      const instance = wrapper.instance()
      instance.setState({newPassword: 'foobar', confirmPassword: 'bazbar'})
      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Passwords do not match')
    })

    it('calls confirm password when passwords match', () => {
      const wrapper = shallow(<ResetPasswordForm email="a@test.com" cognitoUser={cognitoUser}/>)

      const instance = wrapper.instance()
      instance.setState({newPassword: 'foobar', confirmPassword: 'foobar', code: 'some_code'})
      instance.changePassword(event)

      expect(mockConfirmPassword.mock.calls.length).toEqual(1)
      expect(mockConfirmPassword.mock.calls[0][0]).toEqual('some_code')
      expect(mockConfirmPassword.mock.calls[0][1]).toEqual('foobar')
    })

    it('shows error on confirm password error', () => {
      const mockShowError = jest.fn()

      const wrapper = shallow(<ResetPasswordForm cognitoUser={cognitoUser} showError={mockShowError}/>)

      const instance = wrapper.instance()
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onFailure({message: 'some_message'})
      }

      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('some_message')
    })

    it('Shows custom error message, when error code is InvalidParameterException', () => {
      const mockShowError = jest.fn()

      const wrapper = shallow(<ResetPasswordForm cognitoUser={cognitoUser} showError={mockShowError} />)

      const instance = wrapper.instance()
      const err = {code: 'InvalidParameterException'}
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onFailure(err)
      }

      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Password does not conform to policy: Password not long enough')
    })

    it('pushes to login on success', () => {
      const mockPush = jest.fn()
      const history = {push: mockPush}

      const wrapper = shallow(<ResetPasswordForm cognitoUser={cognitoUser} history={history} />)

      const instance = wrapper.instance()
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onSuccess()
      }

      instance.changePassword(event)

      expect(mockPush.mock.calls.length).toEqual(1)
      expect(mockPush.mock.calls[0][0]).toEqual('/login')
    })
  })

  describe('submit button Tests', () => {
    const wrapper = shallow(<ResetPasswordForm email="a@test.com" />)

    it('contains submit button', () => {
      const button = wrapper.find('button')

      expect(button).toHaveLength(1)
    })

    it('has correct text on submit button', () => {
      const button = wrapper.find('button')

      expect(button.text()).toEqual('Change Password')
    })

    it('calls correct callback onClick', () => {
      const button = wrapper.find('button')
      const instance = wrapper.instance()

      expect(button).toHaveLength(1)
      expect(button.props().onClick).toEqual(instance.changePassword)
    })
  })
})

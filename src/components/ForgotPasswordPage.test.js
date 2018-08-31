import React from 'react'
import { shallow } from 'enzyme'
import ForgotPasswordPage from './ForgotPasswordPage'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import * as Auth from '../utils/Auth'

describe('ForgotPasswordPage.js Tests', () => {
  const event = { preventDefault: () => {} }

  it('should have reseting=false by default', () => {
    const wrapper = shallow(<ForgotPasswordPage/>)

    expect(wrapper.state().reseting).toEqual(false)
  })

  it('should contain <ForgotPasswordForm> by default', () => {
    const wrapper = shallow(<ForgotPasswordPage/>)

    expect(wrapper.find(ForgotPasswordForm).length).toEqual(1)
    expect(wrapper.find(ResetPasswordForm).length).toEqual(0)
  })

  it('should contain <ResetPasswordForm>', () => {
    let mock = jest.fn()

    console.error = mock
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.setState({ reseting: true, code: 'code', new_password: 'abc', confirm_password: 'def' })
    expect(wrapper.find(ForgotPasswordForm).length).toEqual(0)
    expect(wrapper.find(ResetPasswordForm).length).toEqual(1)
  })

  it('masks email correct', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    let masked = wrapper.instance().mask('abcdef@domain.com')
    expect(masked).toEqual('a****f@domain.com')
  })

  it('sets code on updateCodeState', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.instance().updateCodeState({ target: { value: 'the_code' } })
    expect(wrapper.state().code).toEqual('the_code')
  })

  it('sets email on updatEmailState', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.instance().updateEmailState({ target: { value: 'email' } })
    expect(wrapper.state().email).toEqual('email')
  })

  it('sets new password on updateNewPasswordState', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.instance().updateNewPasswordState({ target: { value: 'password' } })
    expect(wrapper.state().new_password).toEqual('password')
  })

  it('sets conform password on updateConfirmPasswordState', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.instance().updateConfirmPasswordState({ target: { value: 'password' } })
    expect(wrapper.state().confirm_password).toEqual('password')
  })

  it('sets up correctly when showing reset area', () => {
    let mock = jest.fn()

    // eslint-disable-next-line no-console
    console.error = mock
    const wrapper = shallow(<ForgotPasswordPage />)
    wrapper.setState({reseting: false, maskedEmail: ''})
    wrapper.instance().setState({email: 'abcdef@domain.com'})
    wrapper.instance().showResetArea()
    expect(wrapper.state().reseting).toEqual(true)
    expect(wrapper.state().email).toEqual('a****f@domain.com')
  })

  it('shows error correctly', () => {
    const wrapper = shallow(<ForgotPasswordPage />)
    wrapper.instance().showError('some_message')
    expect(wrapper.state().errorMsg).toEqual('some_message')
  })

  describe('onEmailSubmit Tests', () => {
    let mockForgotPassword = jest.fn()
    let cognitoUser = {
      forgotPassword: mockForgotPassword
    }

    let mockAuthCreateUser = jest.fn()

    beforeEach(() => {
      // eslint-disable-next-line
            Auth.createUser = mockAuthCreateUser;
      cognitoUser = {
        forgotPassword: mockForgotPassword
      }
      mockAuthCreateUser.mockReturnValue(cognitoUser)
    })

    afterEach(() => {
      mockForgotPassword.mockReset()
      mockAuthCreateUser.mockReset()
    })

    it('sets cognitoUser to state', () => {
      const wrapper = shallow(<ForgotPasswordPage />)
      wrapper.instance().onEmailSubmit(event)
      expect(wrapper.state().cognitoUser).toEqual(cognitoUser)
    })

    it('calls forgotPassword', () => {
      const wrapper = shallow(<ForgotPasswordPage />)
      wrapper.instance().onEmailSubmit(event)
      expect(mockForgotPassword.mock.calls.length).toEqual(1)
    })

    it('displays email is required if InvalidParameter', () => {
      let mockShowError = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)
      cognitoUser.forgotPassword = (callback) => {
        callback.onFailure({code: 'InvalidParameterException', message: 'some_message'})
      }
      let instance = wrapper.instance()
      instance.showError = mockShowError
      instance.onEmailSubmit(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Email is required')
    })

    it('displays given errorMessage if not InvalidParameter', () => {
      let mockShowError = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)
      cognitoUser.forgotPassword = (callback) => {
        callback.onFailure({code: 'something', message: 'some_message'})
      }
      let instance = wrapper.instance()
      instance.showError = mockShowError
      instance.onEmailSubmit(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('some_message')
    })

    it('shows reset area', () => {
      let mockShowResetArea = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)
      cognitoUser.forgotPassword = (callback) => {
        callback.inputVerificationCode()
      }
      let instance = wrapper.instance()
      instance.showResetArea = mockShowResetArea

      instance.onEmailSubmit(event)

      expect(mockShowResetArea.mock.calls.length).toEqual(1)
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
      let mockShowError = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)

      let instance = wrapper.instance()
      instance.showError = mockShowError
      instance.setState({new_password: 'foobar', confirm_password: 'bazbar'})
      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Passwords do not match')
    })

    it('calls confirm password when passwords match', () => {
      const wrapper = shallow(<ForgotPasswordPage />)

      let instance = wrapper.instance()
      instance.setState({new_password: 'foobar', confirm_password: 'foobar', code: 'some_code', cognitoUser: cognitoUser})
      instance.changePassword(event)

      expect(mockConfirmPassword.mock.calls.length).toEqual(1)
      expect(mockConfirmPassword.mock.calls[0][0]).toEqual('some_code')
      expect(mockConfirmPassword.mock.calls[0][1]).toEqual('foobar')
    })

    it('shows error on confirm password error', () => {
      let mockShowError = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)

      let instance = wrapper.instance()
      instance.showError = mockShowError
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onFailure({message: 'some_message'})
      }

      instance.setState({new_password: 'foobar', confirm_password: 'foobar', cognitoUser: cognitoUser})
      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('some_message')
    })

    it('Shows custom error message, when error code is InvalidParameterException', () => {
      let mockShowError = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)

      let instance = wrapper.instance()
      instance.showError = mockShowError
      let err = {code: 'InvalidParameterException'}
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onFailure(err)
      }

      instance.setState({new_password: 'foo', confirm_password: 'foo', cognitoUser: cognitoUser})
      instance.changePassword(event)

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Password does not conform to policy: Password not long enough')
    })

    it('pushes to login and show success message on success', () => {
      let mockPush = jest.fn()

      const wrapper = shallow(<ForgotPasswordPage />)

      let instance = wrapper.instance()
      let history = {push: mockPush}
      wrapper.setProps({history: history})
      cognitoUser.confirmPassword = (code, password, callback) => {
        callback.onSuccess()
      }

      instance.setState({new_password: 'foobar', confirm_password: 'foobar', cognitoUser: cognitoUser})
      instance.changePassword(event)

      expect(mockPush.mock.calls.length).toEqual(2)
      expect(mockPush.mock.calls[0][0]).toEqual('/login')
      expect(mockPush.mock.calls[1][0]).toEqual({msg: 'Password has been reset successfully. Please use your new password to login.'})
    })
  })
})

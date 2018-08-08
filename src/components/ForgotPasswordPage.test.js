import React from 'react'
import { shallow } from 'enzyme'
import ForgotPasswordPage from './ForgotPasswordPage'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import * as Auth from '../utils/Auth'

describe('ForgotPasswordPage.js Tests', () => {
  const event = { preventDefault: () => {} }

  it('should have resetting=false by default', () => {
    const wrapper = shallow(<ForgotPasswordPage/>)

    expect(wrapper.state().resetting).toEqual(false)
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

    wrapper.setState({ resetting: true, code: 'code', new_password: 'abc', confirm_password: 'def' })
    expect(wrapper.find(ForgotPasswordForm).length).toEqual(0)
    expect(wrapper.find(ResetPasswordForm).length).toEqual(1)
  })

  it('masks email correct', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    let masked = wrapper.instance().mask('abcdef@domain.com')
    expect(masked).toEqual('a****f@domain.com')
  })

  it('sets email on updatEmailState', () => {
    const wrapper = shallow(<ForgotPasswordPage />)

    wrapper.instance().updateEmailState({ target: { value: 'email' } })
    expect(wrapper.state().email).toEqual('email')
  })

  it('sets up correctly when showing reset area', () => {
    let mock = jest.fn()

    // eslint-disable-next-line no-console
    console.error = mock
    const wrapper = shallow(<ForgotPasswordPage />)
    wrapper.setState({resetting: false, maskedEmail: ''})
    wrapper.instance().setState({email: 'abcdef@domain.com'})
    wrapper.instance().showResetArea()
    expect(wrapper.state().resetting).toEqual(true)
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

    it('displays given msg if not InvalidParameter', () => {
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
})

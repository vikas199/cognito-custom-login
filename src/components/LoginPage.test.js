import React from 'react'
import { shallow } from 'enzyme'
import LoginPage from './LoginPage'
import LoginForm from './LoginForm'
import MfaForm from './MfaForm'
import * as Auth from '../utils/Auth'

describe('LoginPage.js Tests', () => {
  it('should have validating=false by default', () => {
    const wrapper = shallow(<LoginPage/>)

    expect(wrapper.state().validating).toEqual(false)
  })

  it('should contain <LoginForm> by default', () => {
    const wrapper = shallow(<LoginPage/>)

    expect(wrapper.find(LoginForm).length).toEqual(1)
    expect(wrapper.find(MfaForm).length).toEqual(0)
  })

  it('should contain <MfaForm>', () => {
    const wrapper = shallow(<LoginPage />)

    wrapper.setState({ validating: true })
    expect(wrapper.find(LoginForm).length).toEqual(0)
    expect(wrapper.find(MfaForm).length).toEqual(1)
  })

  it('should contain form', () => {
    const wrapper = shallow(<LoginPage/>)

    expect(wrapper.find('#login-form').length).toEqual(1)
  })

  it('sets code on updateCodeState', () => {
    const wrapper = shallow(<LoginPage />)

    wrapper.instance().updateCodeState({ target: { value: 'the_code' } })
    expect(wrapper.state().code).toEqual('the_code')
  })

  it('sets email on updatEmailState', () => {
    const wrapper = shallow(<LoginPage />)

    wrapper.instance().updateEmailState({ target: { value: 'email' } })
    expect(wrapper.state().email).toEqual('email')
  })

  it('sets password on updatePasswordState', () => {
    const wrapper = shallow(<LoginPage />)

    wrapper.instance().updatePasswordState({ target: { value: 'password' } })
    expect(wrapper.state().password).toEqual('password')
  })

  it('sets up correctly when showing validation area', () => {
    const wrapper = shallow(<LoginPage />)
    wrapper.setState({validating: false, maskedEmail: ''})
    wrapper.instance().showValidationArea('a@test.com')
    expect(wrapper.state().validating).toEqual(true)
    expect(wrapper.state().maskedEmail).toEqual('a@test.com')
  })

  it('sets up correctly when showError', () => {
    const wrapper = shallow(<LoginPage />)
    wrapper.setState({
      validating: true,
      maskedEmail: 'somevalue',
      errorMsg: '',
      email: 'a@a.com',
      password: 'password'
    })

    wrapper.instance().showError('msg')
    expect(wrapper.state()).toEqual({
      code: '',
      validating: false,
      maskedEmail: undefined,
      errorMsg: 'msg',
      email: '',
      password: '',
      cognitoJson: '{}'
    })
  })

  describe('validate Tests', () => {
    it('calls cognitoUser.sendCustomChallengeAnswer with correct value', () => {
      const sendCustomChallengeAnswer = jest.fn()
      const cognitoUser = {
        deviceKey: 'device_key',
        sendCustomChallengeAnswer: sendCustomChallengeAnswer
      }

      const wrapper = shallow(<LoginPage />)
      wrapper.setState(
        {
          cognitoUser: cognitoUser,
          code: 'some_code'
        }
      )
      wrapper.instance().validate()
      expect(sendCustomChallengeAnswer.mock.calls.length).toEqual(1)
      expect(sendCustomChallengeAnswer.mock.calls[0][0]).toEqual('some_code device_key')
    })

    it('calls showError when error', () => {
      const mockShowError = jest.fn()

      const sendCustomChallengeAnswer = (response, callback) => {
        callback.onFailure()
      }
      const cognitoUser = {
        deviceKey: 'device_key',
        sendCustomChallengeAnswer: sendCustomChallengeAnswer
      }
      const wrapper = shallow(<LoginPage />)
      wrapper.setState(
        {
          cognitoUser: cognitoUser,
          code: 'some_code'
        }
      )
      wrapper.instance().showError = mockShowError
      wrapper.instance().validate()
      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Unable to verify account')
    })
  })

  describe('login Tests', () => {
    const mockAuthenticateUserDefaultAuth = jest.fn()
    const mockSendCustomChallengeAnswer = jest.fn()
    const mockSetAuthenticationFlowType = jest.fn()
    let cognitoUser = {
      authenticateUserDefaultAuth: mockAuthenticateUserDefaultAuth,
      sendCustomChallengeAnswer: mockSendCustomChallengeAnswer,
      setAuthenticationFlowType: mockSetAuthenticationFlowType,
      deviceKey: 'device_key'
    }

    const mockAuthCreateUser = jest.fn()

    Auth.createUser = mockAuthCreateUser

    beforeEach(() => {
      cognitoUser = {
        authenticateUserDefaultAuth: mockAuthenticateUserDefaultAuth,
        sendCustomChallengeAnswer: mockSendCustomChallengeAnswer,
        setAuthenticationFlowType: mockSetAuthenticationFlowType,
        deviceKey: 'device_key'
      }
      mockAuthCreateUser.mockReturnValue(cognitoUser)
    })

    afterEach(() => {
      mockAuthenticateUserDefaultAuth.mockReset()
      mockSendCustomChallengeAnswer.mockReset()
      mockSetAuthenticationFlowType.mockReset()
      mockAuthCreateUser.mockReset()
    })

    it('sets cognitoUser to state', () => {
      const wrapper = shallow(<LoginPage />)
      wrapper.instance().login()
      expect(wrapper.state().cognitoUser).toEqual(cognitoUser)
    })

    it('sets authenticationFlowType to CUSTOM_AUTH', () => {
      const wrapper = shallow(<LoginPage />)
      wrapper.instance().login()

      expect(mockSetAuthenticationFlowType.mock.calls.length).toEqual(1)
      expect(mockSetAuthenticationFlowType.mock.calls[0][0]).toEqual('CUSTOM_AUTH')
    })

    it('calls cognitoUser.authenticateUserDefaultAuth', () => {
      const wrapper = shallow(<LoginPage />)
      wrapper.instance().login()

      expect(mockAuthenticateUserDefaultAuth.mock.calls.length).toEqual(1)
    })

    it('displays email is required if InvalidParameter', () => {
      const mockShowError = jest.fn()

      const wrapper = shallow(<LoginPage />)
      cognitoUser.authenticateUserDefaultAuth = (details, callback) => {
        callback.onFailure({code: 'InvalidParameterException', message: 'some_message'})
      }
      const instance = wrapper.instance()
      instance.showError = mockShowError
      instance.login()

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('Email is required')
    })

    it('displays given msg if not InvalidParameter', () => {
      const mockShowError = jest.fn()

      const wrapper = shallow(<LoginPage />)
      cognitoUser.authenticateUserDefaultAuth = (details, callback) => {
        callback.onFailure({code: 'something', message: 'some_message'})
      }
      const instance = wrapper.instance()
      instance.showError = mockShowError
      instance.login()

      expect(mockShowError.mock.calls.length).toEqual(1)
      expect(mockShowError.mock.calls[0][0]).toEqual('some_message')
    })

    describe('customChallenge Tests', () => {
      it('calls showError on Error', () => {
        const mockShowError = jest.fn()

        const wrapper = shallow(<LoginPage />)
        cognitoUser.authenticateUserDefaultAuth = (details, callback) => {
          callback.customChallenge()
        }
        cognitoUser.sendCustomChallengeAnswer = (details, callback) => {
          callback.onFailure({code: 'somecode', message: 'some_message'})
        }
        const instance = wrapper.instance()
        instance.showError = mockShowError
        instance.login()

        expect(mockShowError.mock.calls.length).toEqual(1)
        expect(mockShowError.mock.calls[0][0]).toEqual('some_message')
      })

      it('calls sendToRedirectUri when success', () => {
        const mockSetCognitoToken = jest.fn()

        const sendCustomChallengeAnswer = (response, callback) => {
          callback.onSuccess()
        }
        const cognitoUser = {
          deviceKey: 'device_key',
          sendCustomChallengeAnswer: sendCustomChallengeAnswer
        }
        const wrapper = shallow(<LoginPage />)
        wrapper.setState(
          {
            cognitoUser: cognitoUser,
            code: 'some_code'
          }
        )

        const instance = wrapper.instance()
        instance.setCognitoToken = mockSetCognitoToken
        instance.validate()
        expect(mockSetCognitoToken.mock.calls.length).toEqual(1)
      })

      it('calls sendToRedirectUri', () => {
        const mockSendToRedirectUri = jest.fn()
        const wrapper = shallow(<LoginPage />)
        cognitoUser.authenticateUserDefaultAuth = (details, callback) => {
          callback.customChallenge()
        }
        cognitoUser.sendCustomChallengeAnswer = (details, callback) => {
          callback.onSuccess()
        }

        const instance = wrapper.instance()
        instance.sendToRedirectUri = mockSendToRedirectUri
        instance.login()

        expect(mockSendToRedirectUri.mock.calls.length).toEqual(1)
        // expect(mockSendToRedirectUri.mock.calls[0].length).toEqual(0)
      })

      it('shows validation area', () => {
        const mockShowValidationArea = jest.fn()
        const wrapper = shallow(<LoginPage />)
        cognitoUser.authenticateUserDefaultAuth = (details, callback) => {
          callback.customChallenge()
        }
        cognitoUser.sendCustomChallengeAnswer = (details, callback) => {
          callback.customChallenge({maskedEmail: 'someEmail'})
        }

        const instance = wrapper.instance()
        instance.showValidationArea = mockShowValidationArea
        instance.login()

        expect(mockShowValidationArea.mock.calls.length).toEqual(1)
        expect(mockShowValidationArea.mock.calls[0][0]).toEqual('someEmail')
      })
    })
  })
})

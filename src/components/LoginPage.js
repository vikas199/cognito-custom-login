import React, { Component } from 'react'

import qs from 'query-string'
import LoginForm from './LoginForm'
import MfaForm from './MfaForm'
import NewPasswordRequiredForm from './NewPasswordRequiredForm'
import * as Auth from '../utils/Auth'

const MODE = {
  LOGIN: 1,
  VALIDATING: 2,
  NEW_PASSWORD: 3
}

class LoginPage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      mode: MODE.LOGIN,
      errorMsg: undefined,
      email: '',
      password: '',
      code: '',
      cognitoJson: '{}',
      newPassword: '',
      confirmPassword: ''
    }
    this.login = this.login.bind(this)
    this.validate = this.validate.bind(this)
    this.showValidationArea = this.showValidationArea.bind(this)
    this.showError = this.showError.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.setCognitoToken = this.setCognitoToken.bind(this)
    this.submitFormToPerry = this.submitFormToPerry.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.showNewPasswordRequiredArea = this.showNewPasswordRequiredArea.bind(this)
  }

  onInputChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  showValidationArea (maskedEmail) {
    this.setState({
      mode: MODE.VALIDATING,
      maskedEmail: maskedEmail
    })
  }

  showNewPasswordRequiredArea () {
    this.setState({
      mode: MODE.NEW_PASSWORD
    })
  }

  setCognitoToken (token) {
    this.setState({cognitoJson: token})
    this.submitFormToPerry()
  }

  submitFormToPerry () {
    document.getElementById('login-form').submit()
  }

  showError (msg, mode = MODE.LOGIN) {
    this.setState({
      mode: mode,
      maskedEmail: undefined,
      errorMsg: msg,
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      code: ''
    })
  }

  validate () {
    let cognitoUser = this.state.cognitoUser
    let challengeResponses = this.state.code + ' ' + cognitoUser.deviceKey
    let showError = this.showError

    let setCognitoToken = this.setCognitoToken
    cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
      onSuccess: function (result) {
        setCognitoToken(JSON.stringify(result))
      },
      onFailure: function () {
        showError('Unable to verify account')
      }
    })
  }

  login () {
    let showValidationArea = this.showValidationArea
    let showNewPasswordRequiredArea = this.showNewPasswordRequiredArea
    let showError = this.showError
    let setCognitoToken = this.setCognitoToken

    let cognitoUser = Auth.createUser(this.state)
    this.setState({
      cognitoUser: cognitoUser
    })
    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH')
    let authenticationDetails = Auth.authenticationDetails(this.state)
    cognitoUser.authenticateUserDefaultAuth(authenticationDetails, {
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        showNewPasswordRequiredArea()
      },
      onFailure: function (err) {
        if (err.code === 'InvalidParameterException') {
          showError('Email is required')
        } else {
          showError(err.message)
        }
      },
      customChallenge: function () {
        // device challenge
        let challengeResponses
        challengeResponses = cognitoUser.deviceKey ? cognitoUser.deviceKey : 'null'
        cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
          onSuccess: function (result) {
            setCognitoToken(JSON.stringify(result))
          },
          onFailure: function (err) {
            showError(err.message)
          },
          customChallenge: function (challengeParameters) {
            showValidationArea(challengeParameters.maskedEmail)
          }
        })
      }
    })
  }

  changePassword () {
    let showError = this.showError
    let cognitoUser = this.state.cognitoUser
    let setCognitoToken = this.setCognitoToken
    switch (this.state.confirmPassword) {
      case this.state.newPassword:
        cognitoUser.completeNewPasswordChallenge(this.state.newPassword, {}, {
          onSuccess: function (result) {
            setCognitoToken(JSON.stringify(result))
          },
          onFailure: function (err) {
            showError(err.message, MODE.NEW_PASSWORD)
          }
        })
        break
      default: {
        this.setState({
          newPassword: '',
          confirmPassword: ''
        })
        showError('Passwords do not match', MODE.NEW_PASSWORD)
      }
    }
  }

  render () {
    const perryLoginUrl = `${process.env.PERRY_URL}/perry/login`

    let comp
    switch (this.state.mode) {
      case MODE.VALIDATING:
        comp = <MfaForm
          maskedEmail={this.state.maskedEmail}
          code={this.state.code}
          onCodeChange={this.onInputChange}
          onValidate={this.validate} />
        break
      case MODE.NEW_PASSWORD:
        comp = <NewPasswordRequiredForm
          errorMsg={this.state.errorMsg}
          confirmPassword={this.state.confirmPassword}
          newPassword={this.state.newPassword}
          onNewPasswordChange={this.onInputChange}
          onConfirmPasswordChange={this.onInputChange}
          onSubmit={this.changePassword} />
        break
      case MODE.LOGIN:
        comp = <LoginForm
          onSubmit={this.login}
          errorMsg={this.state.errorMsg}
          email={this.state.email}
          password={this.state.password}
          onEmailChange={this.onInputChange}
          onPasswordChange={this.onInputChange} />
        break
      default:
        this.showError('Unknown Request')
        break
    }

    return (
      <React.Fragment>
        {comp}
        <form id='login-form' action={perryLoginUrl} method='post'>
          <input
            type='hidden'
            name="CognitoResponse"
            value={this.state.cognitoJson} />
        </form>
      </React.Fragment>
    )
  }
}

export default LoginPage

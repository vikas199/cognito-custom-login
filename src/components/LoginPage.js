import React, { Component } from 'react'
import {customErrorMessage} from '../utils/CommonHelper'
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
      confirmPassword: '',
      disableSignIn: false,
      disableVerify: false
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
    this.onCancel = this.onCancel.bind(this)
  }

  onInputChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  showValidationArea (maskedEmail) {
    this.setState({
      mode: MODE.VALIDATING,
      maskedEmail: maskedEmail,
      errorMsg: ''
    })
  }

  showNewPasswordRequiredArea () {
    this.setState({
      mode: MODE.NEW_PASSWORD,
      errorMsg: ''
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
      code: '',
      disableSignIn: false,
      disableVerify: false
    })
  }

  validate (event) {
    event.preventDefault()
    const cognitoUser = this.state.cognitoUser
    const challengeResponses = this.state.code.trim() + ' ' + cognitoUser.deviceKey
    const showError = this.showError

    const setCognitoToken = this.setCognitoToken
    this.setState({
      disableVerify: true
    })
    cognitoUser.sendCustomChallengeAnswer(challengeResponses, {
      onSuccess: function (result) {
        setCognitoToken(JSON.stringify(result))
      },
      onFailure: function () {
        showError('Unable to verify account', MODE.VALIDATING)
      }
    })
  }

  login (event) {
    event.preventDefault()
    const showValidationArea = this.showValidationArea
    const showNewPasswordRequiredArea = this.showNewPasswordRequiredArea
    this.props.history.push({msg: ''})
    const showError = this.showError
    const setCognitoToken = this.setCognitoToken

    const cognitoUser = Auth.createUser(this.state)
    this.setState({
      cognitoUser: cognitoUser,
      disableSignIn: true
    })
    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH')

    const authenticationDetails = Auth.authenticationDetails(this.state)
    cognitoUser.authenticateUserDefaultAuth(authenticationDetails, {
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        showNewPasswordRequiredArea()
      },
      onFailure: function (err) {
        const errorMessage = customErrorMessage(err.message)
        showError(errorMessage)
      },
      customChallenge: function () {
        // device challenge
        const challengeResponses = cognitoUser.deviceKey ? cognitoUser.deviceKey : 'null'
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

  changePassword (event) {
    event.preventDefault()
    const showError = this.showError
    const cognitoUser = this.state.cognitoUser
    const setCognitoToken = this.setCognitoToken
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

  onCancel () {
    this.setState({
      disableSignIn: false,
      mode: MODE.LOGIN,
      errorMsg: ''
    })
  }

  render () {
    const perryLoginUrl = `${process.env.PERRY_URL}/perry/login`
    let comp
    switch (this.state.mode) {
      // MFA PAGE
      case MODE.VALIDATING:
        comp = <MfaForm
          disableVerify={this.state.disableVerify}
          maskedEmail={this.state.maskedEmail}
          code={this.state.code}
          onCodeChange={this.onInputChange}
          onValidate={event => this.validate(event)}
          onCancel={this.onCancel}
          errorMsg={this.state.errorMsg} />
        break
      case MODE.NEW_PASSWORD:
        comp = <NewPasswordRequiredForm
          errorMsg={this.state.errorMsg}
          confirmPassword={this.state.confirmPassword}
          newPassword={this.state.newPassword}
          onNewPasswordChange={this.onInputChange}
          onConfirmPasswordChange={this.onInputChange}
          onSubmit={event => this.changePassword(event)} />
        break
      case MODE.LOGIN:
        comp = <LoginForm
          onSubmit={event => this.login(event)}
          disableSignIn={this.state.disableSignIn}
          errorMsg={this.state.errorMsg}
          successMessage={this.props.history.location.msg}
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

LoginPage.defaultProps = {
  history: {
    location: {msg: ''}
  }
}

export default LoginPage

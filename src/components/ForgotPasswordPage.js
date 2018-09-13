import React, { Component } from 'react'
import * as Auth from '../utils/Auth'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

// TODO - redirect_uri on the url?  save it to state
class ForgotPasswordPage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      reseting: false,
      email: '',
      errorMsg: undefined,
      new_password: '',
      confirm_password: '',
      disableResetPassword: false
    }
    this.showResetArea = this.showResetArea.bind(this)
    this.showError = this.showError.bind(this)
    this.updateEmailState = this.updateEmailState.bind(this)
    this.onEmailSubmit = this.onEmailSubmit.bind(this)
    this.updateCodeState = this.updateCodeState.bind(this)
    this.updateNewPasswordState = this.updateNewPasswordState.bind(this)
    this.updateConfirmPasswordState = this.updateConfirmPasswordState.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.mask = this.mask.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  mask (email) {
    return email.replace(/^(.)(.*)(.@.*)$/,
      (_, a, b, c) => a + b.replace(/./g, '*') + c
    )
  }

  onEmailSubmit (event) {
    event.preventDefault()
    let showResetArea = this.showResetArea
    let showError = this.showError
    let cognitoUser = Auth.createUser(this.state)
    console.log(cognitoUser.adminCreateUser)
    this.setState({
      cognitoUser: cognitoUser,
      disableResetPassword: true
    })

    // cognitoUser.resendConfirmationCode(function (err, result) {
    //   if (err) {
    //     console.log(err)
    //     return
    //   }
    //   console.log(result)
    // })

    cognitoUser.forgotPassword({
      onFailure: function (err) {
        if (err.code === 'InvalidParameterException') {
          showError('Email is required')
        } else {
          showError(err.message)
        }
      },
      inputVerificationCode () {
        showResetArea()
      }
    })
  }

  updateEmailState (event) {
    this.setState({
      email: event.target.value
    })
  }

  updateCodeState (event) {
    this.setState({
      code: event.target.value
    })
  }

  updateNewPasswordState (event) {
    this.setState({
      new_password: event.target.value
    })
  }

  updateConfirmPasswordState (event) {
    this.setState({
      confirm_password: event.target.value
    })
  }

  showResetArea () {
    this.setState({
      errorMsg: '',
      reseting: true,
      email: this.mask(this.state.email),
      code: '',
      new_password: '',
      confirm_password: ''
    })
  }

  showError (msg) {
    this.setState({
      errorMsg: msg,
      disableResetPassword: false
    })
  }

  onCancel () {
    this.props.history.push('/login')
  }

  changePassword (event) {
    event.preventDefault()
    let showError = this.showError
    let cognitoUser = this.state.cognitoUser
    let props = this.props
    switch (this.state.confirm_password) {
      case this.state.new_password:
        cognitoUser.confirmPassword(this.state.code.trim(), this.state.new_password, {
          onSuccess: function () {
            props.history.push('/login')
            props.history.push({msg: 'Password has been reset successfully. Please use your new password to login.'})
          },
          onFailure: function (err) {
            if (err.code === 'InvalidParameterException') {
              showError('Password does not conform to policy: Password not long enough')
            } else {
              showError(err.message)
            }
          }
        })
        break
      default: {
        this.setState({
          new_password: '',
          confirm_password: ''
        })
        showError('Passwords do not match')
      }
    }
  }

  render () {
    if (this.state.reseting) {
      return (
        <ResetPasswordForm
          email={this.state.email}
          errorMsg={this.state.errorMsg}
          code={this.state.code}
          newPassword={this.state.new_password}
          confirmPassword={this.state.confirm_password}
          onCodeChange={this.updateCodeState}
          onNewPasswordChange={this.updateNewPasswordState}
          onConfirmPasswordChange={this.updateConfirmPasswordState}
          onSubmit={event => this.changePassword(event)}/>)
    } else {
      return (
        <ForgotPasswordForm
          errorMsg={this.state.errorMsg}
          email={this.state.email}
          onChange={this.updateEmailState}
          disableResetPassword={this.state.disableResetPassword}
          onCancel={this.onCancel}
          onSubmit={event => this.onEmailSubmit(event)}/>)
    }
  }
}

export default ForgotPasswordPage

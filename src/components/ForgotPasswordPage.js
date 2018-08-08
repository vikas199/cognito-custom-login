import React, { Component } from 'react'
import * as Auth from '../utils/Auth'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

// TODO - redirect_uri on the url?  save it to state
class ForgotPasswordPage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      resetting: false,
      email: '',
      errorMsg: undefined,
      cognitoUser: undefined
    }
    this.showResetArea = this.showResetArea.bind(this)
    this.showError = this.showError.bind(this)
    this.updateEmailState = this.updateEmailState.bind(this)
    this.onEmailSubmit = this.onEmailSubmit.bind(this)
    this.mask = this.mask.bind(this)
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
    this.setState({
      cognitoUser: cognitoUser
    })

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

  showResetArea () {
    this.setState({
      errorMsg: '',
      resetting: true,
      email: this.mask(this.state.email)
    })
  }

  showError (msg) {
    this.setState({
      errorMsg: msg
    })
  }

  render () {
    if (this.state.resetting) {
      return (
        <ResetPasswordForm
          email={this.state.email}
          errorMsg={this.state.errorMsg}
          cognitoUser={this.state.cognitoUser}
          showError={this.showError}
          history={this.props.history}
        />)
    } else {
      return (
        <ForgotPasswordForm
          errorMsg={this.state.errorMsg}
          email={this.state.email}
          onChange={this.updateEmailState}
          onSubmit={event => this.onEmailSubmit(event)}/>)
    }
  }
}

export default ForgotPasswordPage

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import PasswordInstructions from './PasswordInstructions'

class ResetPasswordForm extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      code: '',
      newPassword: '',
      confirmPassword: ''

    }

    this.updateCodeState = this.updateCodeState.bind(this)
    this.updateNewPasswordState = this.updateNewPasswordState.bind(this)
    this.updateConfirmPasswordState = this.updateConfirmPasswordState.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  updateCodeState (event) {
    this.setState({
      code: event.target.value
    })
  }

  updateNewPasswordState (event) {
    this.setState({
      newPassword: event.target.value
    })
  }

  updateConfirmPasswordState (event) {
    this.setState({
      confirmPassword: event.target.value
    })
  }

  changePassword (event) {
    event.preventDefault()
    let props = this.props
    let showError = props.showError
    let cognitoUser = props.cognitoUser
    switch (this.state.confirmPassword) {
      case this.state.newPassword:
        cognitoUser.confirmPassword(this.state.code, this.state.newPassword, {
          onSuccess: function () {
            props.history.push('/login')
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
          newPassword: '',
          confirmPassword: ''
        })
        showError('Passwords do not match')
      }
    }
  }

  render () {
    return (
      <form>
        <h1>Password Reset</h1>
        <ErrorMessage msg={this.props.errorMsg} />
        <br />
        <div id="div-forgot-password-msg">
          <div>Please check your email.</div>
          <br />
          <span id="text-code">We have sent a password reset code by email to {this.props.email}. Enter it below to reset your password.</span>
        </div>
        <label htmlFor='forgot_password_code'>Code</label>
        <input id="forgot_password_code" className="div-control inputField-customizable" type="password" name="code" value={this.state.code} onChange={this.updateCodeState} />
        <br />
        <label htmlFor='new_password'>Create Password</label>
        <input id="new_password" className="form-control inputField-customizable" type="password" name="password" value={this.state.newPassword} onChange={this.updateNewPasswordState} />
        <PasswordInstructions />
        <br />
        <label htmlFor='confirm_password'>Confirm New Password Again</label>
        <input id="confirm_password" className="form-control inputField-customizable" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateConfirmPasswordState}/>

        <button id="change_password_button" className="btn btn-primary submitButton-customizable" type="submit" onClick={this.changePassword}>Change Password</button>
      </form>
    )
  }
}

ResetPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  cognitoUser: PropTypes.object.isRequired,
  showError: PropTypes.func,
  history: PropTypes.object.isRequired
}

ResetPasswordForm.defaultProps = {
  history: {},
  cognitoUser: {}
}

export default ResetPasswordForm

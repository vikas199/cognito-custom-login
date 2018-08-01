import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const ResetPasswordForm = ({email, errorMsg, code, newPassword, confirmPassword, onCodeChange, onNewPasswordChange, onConfirmPasswordChange, onSubmit}) => {
  return (
    <div>
      <h1>Password Reset</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <div id="div-forgot-password-msg">
        <span>Please check your email</span>
        <br/>
        <span id="text-code">We have sent a password reset code by email to {email}. Enter it below to reset your password.</span>
      </div>
      <label>Code</label>
      <input id="forgot_password_code" className="form-control inputField-customizable" type="password" name="code" value={code} onChange={onCodeChange}/>
      <br/>
      <label>Create Password</label>
      <input id="new_password" className="form-control inputField-customizable" type="password" name="password" value={newPassword} onChange={onNewPasswordChange}/>
      <div className='passwordIndicatorSection'>
        <span>Password must be at least 8 characters in length and contain one of each of the following:</span>
        <div className='col-xs-4'>
          <ul>
            <li> lower case letter [a-z] </li>
            <li>upper case letter [A-Z]</li>
          </ul>
        </div>
        <div className='col-xs-8'>
          <ul>
            <li> numeric character [0-9].</li>
            <li> special character</li>
          </ul>
        </div>
      </div>
      <br/>
      <label>Confirm New Password Again</label>
      <input id="confirm_password" className="form-control inputField-customizable" type="password"
        name="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange}/>

      <button id="change_password_button" className="btn btn-primary submitButton-customizable" type="button" onClick={onSubmit}>Change Password</button>
    </div>
  )
}

ResetPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  code: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onNewPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

// ResetPasswordForm.defaultProps = {
//   newPassword: '',
//   confirmPassword: ''
// }

export default ResetPasswordForm

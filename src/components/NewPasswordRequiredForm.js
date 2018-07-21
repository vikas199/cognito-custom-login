import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const NewPasswordRequiredForm = ({errorMsg, newPassword, confirmPassword, onNewPasswordChange, onConfirmPasswordChange, onSubmit}) => {
  return (
    <div>
      <h1>Update Password</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <label>New Password</label>
      <input id="newPassword" className="form-control inputField-customizable" type="password"
        name="password" value={newPassword} onChange={onNewPasswordChange}/>
      <br/>
      <label>Confirm New Password</label>
      <input id="confirmPassword" className="form-control inputField-customizable" type="password"
        name="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange}/>

      <button id="change_password_button" className="btn btn-primary submitButton-customizable" type="button" onClick={onSubmit}>Change Password</button>
    </div>
  )
}

NewPasswordRequiredForm.propTypes = {
  errorMsg: PropTypes.string,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  onNewPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewPasswordRequiredForm

import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import PasswordInstructions from './PasswordInstructions'

const NewPasswordRequiredForm = ({errorMsg, newPassword, confirmPassword, onNewPasswordChange, onConfirmPasswordChange, onSubmit}) => {
  return (
    <form>
      <h1>Update Password</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <label htmlFor='newPassword'>New Password</label>
      <input id="newPassword" className="form-control inputField-customizable" type="password" name="password" value={newPassword} onChange={onNewPasswordChange} />
      <PasswordInstructions/>
      <br/>
      <label htmlFor='confirmPassword'>Confirm New Password</label>
      <input id="confirmPassword" className="form-control inputField-customizable" type="password" name="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} />
      <button id="change_password_button" className="btn btn-primary submitButton-customizable" type="submit" onClick={onSubmit}>Change Password</button>
    </form>
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

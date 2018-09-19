import React from 'react'
import PropTypes from 'prop-types'
import UserMessage from './UserMessage'
import PasswordInstructions from './PasswordInstructions'

const NewPasswordRequiredForm = ({errorMsg, validateLowerCase, validateSpecialCharacter, validateUpperCase, validateNumber, validateLength, newPassword, confirmPassword, onNewPasswordChange, onConfirmPasswordChange, onSubmit}) => {
  return (
    <form>
      <h1>Update Password</h1>
      <UserMessage errorMessage={errorMsg}/>
      <br/>
      <label id='first_new_password'>New Password</label>
      <input id="newPassword" className="form-control inputField-customizable" type="password" name="password" value={newPassword} onChange={onNewPasswordChange} aria-labelledby="first_new_password"/>
      <PasswordInstructions validateLowerCase={validateLowerCase}
        validateUpperCase={validateUpperCase}
        validateNumber={validateNumber}
        validateLength={validateLength}
        validateSpecialCharacter={validateSpecialCharacter}/>
      <br/>
      <label id='first_confirm_password'>Confirm New Password</label>
      <input id="confirmPassword" className="form-control inputField-customizable" type="password" name="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} aria-labelledby="first_confirm_password"/>
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

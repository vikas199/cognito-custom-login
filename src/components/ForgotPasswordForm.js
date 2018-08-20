import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const ForgotPasswordForm = ({errorMsg, email, onChange, onSubmit, disableResetPassword, onCancel}) => {
  return (
    <form>
      <h1>Password Reset</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <label htmlFor='email' className='label-customizable'>Enter your login email below and we will send a message to reset your password</label>
      <input name="emal" id="email" className="form-control inputField-customizable" type="text"
        placeholder="Email" value={email} onChange={onChange} aria-labelledby='email_label'/>
      <div className= 'submit-block'>
        <button
          type="button"
          id="cancelButton"
          className="cancel-button btn btn-primary"
          onClick={onCancel}>
          Cancel
        </button>
        <button
          type='submit'
          id="validateButton"
          className="reset-password-button btn btn-primary"
          disabled={!email || disableResetPassword}
          onClick={onSubmit}>
          {disableResetPassword ? 'Loading....' : 'Reset my password'}
        </button>
      </div>
    </form>
  )
}

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string
}

export default ForgotPasswordForm

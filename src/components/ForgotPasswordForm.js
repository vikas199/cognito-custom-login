import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const ForgotPasswordForm = ({errorMsg, email, onChange, onSubmit}) => {
  return (
    <form>
      <h1>Password Reset</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <span id='email_label'>Enter your login email below and we will send a message to reset your password</span>
      <br/>
      <input name="email" id="email" className="form-control inputField-customizable" type="text"
        placeholder="Email" value={email} onChange={onChange} aria-labelledby='email_label'/>
      <button className="btn btn-primary submitButton-customizable" type="submit" onClick={onSubmit}>Reset my password</button>
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

import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const ForgotPasswordForm = ({errorMsg, email, onChange, onSubmit}) => {
  return (
    <div>
      <h1>Password Reset</h1>
      <ErrorMessage msg={errorMsg}/>
      <br/>
      <span>Enter your login email below and we will send a message to reset your password</span>
      <br/>
      <input name="emal" id="email" className="form-control inputField-customizable" type="text"
        placeholder="Email" value={email} onChange={onChange}/>
      <button className="btn btn-primary submitButton-customizable" type="button" onClick={onSubmit}>Reset my password</button>
    </div>
  )
}

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string
}

export default ForgotPasswordForm

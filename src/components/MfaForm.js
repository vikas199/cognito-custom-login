import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const MfaForm = ({maskedEmail, code, onCodeChange, onValidate, disableVerify, onCancel, errorMsg}) => {
  return (
    <React.Fragment>
      <div id="div-forgot-password-msg">
        <ErrorMessage msg={errorMsg}/>
        <h1>Account Verification</h1>
        <br/>
        <span id="text-code">For additional security, we need to verify your account.</span>
        <br/><br/>
        <div><span id="text-code">We have sent a verification code by email to {maskedEmail}</span></div>
        <br/>
        <div><span id="text-code">Please enter it below to complete verification.</span></div>
        <br/>
      </div>
      <label>Enter Code</label>
      <input
        id="code"
        className="form-control inputField-customizable"
        type="password"
        name="code"
        value={code}
        onChange={onCodeChange}
        autoFocus
        onBlur={errorMsg ? (event) => { event.currentTarget.focus() } : undefined}/>
      <div className= 'submit-block'>
        <button
          type="button"
          id="cancelButton"
          className="cancel-button btn btn-primary"
          onClick={onCancel}>
          Cancel
        </button>
        <button
          type='button'
          id="validateButton"
          className="validate-button btn btn-primary"
          disabled={!code || disableVerify}
          onClick={onValidate}>
          {disableVerify ? 'Loading....' : 'Verify'}
        </button>
      </div>
    </React.Fragment>
  )
}

MfaForm.propTypes = {
  maskedEmail: PropTypes.string,
  code: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired
}

export default MfaForm

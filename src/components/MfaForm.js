import React from 'react'
import PropTypes from 'prop-types'

const MfaForm = ({maskedEmail, code, onCodeChange, onValidate, disableVerify}) => {
  return (
    <div>
      <div id="div-forgot-password-msg">
        <h1>Account Verification</h1>
        <br/>
        <span id="text-code">For additional security, we need to verify your account.</span>
        <br/><br/>
        <div><span id="text-code">We have sent a verfication code by email to {maskedEmail}</span></div>
        <br/>
        <div><span id="text-code">Please enter it below to complete verification.</span></div>
        <br/>
      </div>
      <label>Code</label>
      <input id="code" className="form-control inputField-customizable" type="password" name="code" value={code} onChange={onCodeChange}/>
      <button type="button" id="validateButton" className="btn btn-primary submitButton-customizable" onClick={onValidate} disabled={disableVerify}>{disableVerify ? 'Loading....' : 'Verify'}</button>

    </div>
  )
}

MfaForm.propTypes = {
  maskedEmail: PropTypes.string,
  code: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired
}

export default MfaForm

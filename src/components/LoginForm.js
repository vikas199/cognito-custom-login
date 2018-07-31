import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({onSubmit, errorMsg, email, password, onEmailChange, onPasswordChange, disableSignIn}) => {
  return (
    <div>
      <span className='textDescription-customizable'><h1>Log In</h1></span>

      <ErrorMessage msg={errorMsg}/>
      <label className='label-customizable'>Email</label>
      <div><input id='email' name='email' type='text' className='form-control inputField-customizable'
        placeholder='Email' value={email} onChange={onEmailChange}/></div>
      <br/>
      <label className='label-customizable'>Password</label>
      <div><input id='password' name='password' type='password' className='form-control inputField-customizable'
        placeholder='Password' value={password} onChange={onPasswordChange}/></div>

      <a className='redirect-customizable' href='/forgotPassword'>Forgot your password?</a>
      <button className="btn btn-primary submitButton-customizable" type="button" onClick={onSubmit} disabled={disableSignIn}>Sign In</button>
      <br/>
      <br/>
      <p className='Notice-This-system'>Notice:<br/>
      This system is the property of the State of California and may be accessed only by authorized users. Unauthorized use of this system is strictly prohibited and may result in, but is not limited to, disciplinary action and criminal prosecution. The State of California may monitor any activity or communication on the system and retrieve any information stored within the system. By accessing and using this system, you are consenting to such monitoring and information retrieval for law enforcement and other purposes. Users have no expectation of privacy as to any communication on, or to any information stored within the system, or to any devices used to access this system.</p>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
}

export default LoginForm

import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({msg}) => {
  return (
    <div style={{display: ((!msg || msg.length === 0) ? 'none' : 'block')}} id="loginErrorMessage" className="errorMessage-customizable">
      <div >{msg}</div>
    </div>
  )
}

ErrorMessage.propTypes = {
  msg: PropTypes.string
}

export default ErrorMessage

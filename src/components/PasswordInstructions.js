import React from 'react'

const PasswordInstructions = () => {
  return (
    <div className='passwordIndicatorSection'>
      <span>Password must be at least 8 characters in length and contain one of each of the following:</span>
      <div className='col-xs-4'>
        <ul>
          <li> lower case letter [a-z] </li>
          <li>upper case letter [A-Z]</li>
        </ul>
      </div>
      <div className='col-xs-8'>
        <ul>
          <li> numeric character [0-9].</li>
          <li> special character</li>
        </ul>
      </div>
    </div>
  )
}

export default PasswordInstructions

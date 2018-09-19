import React from 'react'

export const Cross = () => {
  return <span className="text-danger">&times;</span>
}

export const Tick = () => {
  return <span className="text-success">&#10003;</span>
}

const PasswordInstructions = props => {
  return (
    <div className='passwordIndicatorSection'>
      <span>Password must contain the following:</span><br/>
      <div className="col-xs-6">
        <ul>
          {props.validateLength ? Tick() : Cross()} Minimum 8 characters<br/>
          {props.validateLowerCase ? Tick() : Cross()} Lower case letter [a-z]<br/>
          {props.validateUpperCase ? Tick() : Cross()} Upper case letter [A-Z]<br/>
        </ul>
      </div>
      <div className="col-xs-6">
        <ul>
          {props.validateNumber ? Tick() : Cross()} Numeric character [0-9]<br/>
          {props.validateSpecialCharacter ? Tick() : Cross()} Special character<br/><br/>
        </ul>
      </div>
    </div>
  )
}

export default PasswordInstructions

import React from 'react'
export const customErrorMessage = (errorMessage) => {
  let customMessage = {
    'Missing required parameter USERNAME': 'Email is required.',
    'User account has expired, it must be reset by an administrator.': 'Your temporary password has expired and must be reset by an administrator.',
    1: (<span>Error. You entered the wrong verification code, please try again. You have <b>1</b> attempt remaining.</span>),
    2: (<span>Error. You entered the wrong verification code, please try again. You have <b>2</b> attempts remaining.</span>),
    'default': errorMessage
  }
  return customMessage[errorMessage] || customMessage['default']
}

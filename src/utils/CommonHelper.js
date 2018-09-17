export const customErrorMessage = (errorMessage) => {
  let customMessage = {
    'Missing required parameter USERNAME': 'Email is required.',
    'User account has expired, it must be reset by an administrator.': 'Your temporary password has expired and must be reset by an administrator.',
    'default': errorMessage
  }
  return customMessage[errorMessage] || customMessage['default']
}

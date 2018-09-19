export function validatePassword (instance, newPassword) {
  if (newPassword.match(/.{8,}$/gm)) {
    instance.setState({maxLength: true})
  } else {
    instance.setState({maxLength: false})
  }
  if (newPassword.match(/([a-z])/gm)) {
    instance.setState({lowerCase: true})
  } else {
    instance.setState({lowerCase: false})
  }
  if (newPassword.match(/([A-Z])/gm)) {
    instance.setState({upperCase: true})
  } else {
    instance.setState({upperCase: false})
  }
  if (newPassword.match(/([0-9])/gm)) {
    instance.setState({number: true})
  } else {
    instance.setState({number: false})
  }
  if (newPassword.match(/(\W)/gm)) {
    instance.setState({specialCharacter: true})
  } else {
    instance.setState({specialCharacter: false})
  }
}

import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

export function createUser (state) {
  let username = state.email.toLowerCase()
  var poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
  }
  var userPool = new CognitoUserPool(poolData)
  var userData = {
    Username: username,
    Pool: userPool
  }
  return new CognitoUser(userData)
}

export function authenticationDetails (state) {
  var authenticationData = {
    Username: state.email.toLowerCase(),
    Password: state.password.trim()
  }

  return new AuthenticationDetails(authenticationData)
}

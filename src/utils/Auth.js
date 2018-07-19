import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

export function createUser (state) {
  let username = state.email
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
    Username: state.email,
    Password: state.password
  }

  return new AuthenticationDetails(authenticationData)
}

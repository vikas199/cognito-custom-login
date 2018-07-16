import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

export function createUser (state) {
  let username = state.email
  var poolData = {
    UserPoolId: 'us-west-2_bUtASxUz6',
    ClientId: '2a1df1v8br60i52qofi4qmkj2k'
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

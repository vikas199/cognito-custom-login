import * as Auth from './Auth'

describe('Auth.js Tests', () => {
  describe('createUser Tests', () => {
    it('sets username correctly on cognitoUser', () => {
      let cognitoUser = Auth.createUser({email: 'a@test.com'})

      // assert
      expect(cognitoUser.getUsername()).toEqual('a@test.com')
    })
  })

  describe('authenticationDetails Tests', () => {
    it('sets username correctly', () => {
      let authenticationDetails = Auth.authenticationDetails({email: 'a@test.com', password: 'abcdef'})

      // assert
      expect(authenticationDetails.getUsername()).toEqual('a@test.com')
    })

    it('sets password correctly', () => {
      let authenticationDetails = Auth.authenticationDetails({email: 'a@test.com', password: 'abcdef'})

      // assert
      expect(authenticationDetails.getPassword()).toEqual('abcdef')
    })
  })
})

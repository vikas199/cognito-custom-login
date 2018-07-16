/* eslint-disable import/no-named-as-default */
import { Route, Switch } from 'react-router-dom'

import LoginPage from './LoginPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import Header from './Header'
import React from 'react'
import { hot } from 'react-hot-loader'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="modal-dialog">
          <div className="modal-content background-customizable modal-content-desktop visible-md visible-lg">
            <Header/>
            <div id="div-forms" className="modal-body">
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/forgotpassword" component={ForgotPasswordPage} />
              </Switch>
            </div>
          </div></div></div>
    )
  }
}

export default hot(module)(App)

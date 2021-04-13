import React, { Component } from "react";

import "../../styling/login/Login.css"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

class Login extends Component {
  constructor() {
    super()
    this.state = {
        showLoginScreen: true
    }
    this.handleChange = this.handleChange.bind(this)
}

  handleChange() {
    this.setState(prevstate => {
      return {
        showLoginScreen: !prevstate.showLoginScreen
      }
    })
  }

  render() {
    return (
      <main>
        <div className="contentDiv">
          {this.state.showLoginScreen ? <LoginForm /> : <RegisterForm />}
        </div>
        <a className="registerBtnText" onClick={this.handleChange}>
            {this.state.showLoginScreen ?
              "Register an account" :
              "Sign in"}
        </a>
      </main>
    )
  }
}

export default Login
import React, { useState } from "react";

import "../../styling/login/Login.css"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

function Login() {
  const [showLoginScreen, setShowLoginScreen] = useState(true)

  return (
    <main>
      <div className="contentDiv">
        {showLoginScreen ? <LoginForm /> : <RegisterForm />}
      </div>
      <a className="registerBtnText" onClick={() => setShowLoginScreen(prevState => !prevState)}>
          {showLoginScreen ?
            "Register an account" :
            "Sign in"}
      </a>
    </main>
  )
}

export default Login
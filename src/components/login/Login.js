import React, { useState } from "react"

import "../../styling/login/Login.css"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

function Login() {
  const [showLoginScreen, setShowLoginScreen] = useState(true)

  return (
    <main>
      <div className="content-div">
        {showLoginScreen ? <LoginForm /> : <RegisterForm />}
      </div>
      <a className="register-btn-text" onClick={() => setShowLoginScreen(prevState => !prevState)}>
          {showLoginScreen ?
            "Register an account" :
            "Sign in"}
      </a>
    </main>
  )
}

export default Login
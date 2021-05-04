import React, { useState } from "react"
import { useStore } from "../../context/store"
import { Alert } from "@material-ui/lab"
import { Link } from 'react-router-dom'

import "../../styling/login/LoginForm.css"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginFailAlert, setShowLoginFailAlert] = useState(false)
  const {actions, dispatch, store} = useStore()

  const socket = store.socket

  socket.on("connect", () => {
    socket.emit("login", phoneNumber, password)
  })

  socket.on("login_success", (token) => {
    dispatch({type: actions.UPDATE_SOCKET, value: socket})
    dispatch({type: actions.UPDATE_TOKEN, value: token})
  })

  socket.on("login_fail", () => {
    setShowLoginFailAlert(true)
  })

  function submitForm(e) {
    e.preventDefault(e)
    setShowLoginFailAlert(true)
  }

  return (
    <div className="content-div">
      <div className="login-form">
        <h1>Login</h1>
        {showLoginFailAlert ? <Alert style={{
          margin: "auto"
        }}
        severity="error"
        >
          Invalid username or password.
        </Alert> : undefined }
        <form>
          <input
            className="form-input"
            name="phoneNumber"
            onChange={(e) => {setPhoneNumber(e.target.value)}}
            type="number"
            placeholder="Phone number"
            required/>
          <input
            className="form-input"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required/>
          <input
            className="form-btn"
            type="submit"
            onClick={submitForm}
            value="Sign in"/>
        </form>
      </div>
      <div>
        <Link replace to={"/register"}
          className="register-btn-text">
              Don't have an account? Sign up now!
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
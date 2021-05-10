import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import { Alert } from "@material-ui/lab"
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

import "../../styling/login/LoginForm.css"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginFailAlert, setShowLoginFailAlert] = useState(false)
  const {actions, dispatch, socket} = useStore()

  function submitForm(e) {
    e.preventDefault(e)
    // Need to emit login event here since it depends on the values of phoneNumber and password
    socket.once("connect", () => {
      socket.emit("login", phoneNumber, password)
    })
    socket.connect()
  }

  // Create listener when component is mounted, remove all listeners when component unmounts
  useEffect(() => {
    socket.on("login_success", (token) => {
      dispatch({type: actions.UPDATE_TOKEN, value: token})
    })

    socket.on("login_fail", () => {
      setShowLoginFailAlert(true)
    })

    return () => {
      socket.removeAllListeners()

      socket.on("connect_error", (err) => {
        console.log('connect error due to ' + err.message)
      })
    }
  }, [])

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
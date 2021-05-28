import React, { useState } from "react"
import { useStore } from "../../context/store"
import { Alert } from "@material-ui/lab"
import { Link } from 'react-router-dom'

import "../../styling/login/LoginForm.css"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginFailAlert, setShowLoginFailAlert] = useState(false)
  const {socket, url, actions, dispatch} = useStore()

  const connect_socket = (token) => {
    socket.once("connect", () => {
      dispatch({type: actions.SET_PHONE, value: phoneNumber})
      dispatch({type: actions.SET_TOKEN, value: token})
      console.log("We have officially connected boiiiiiiiiiis.")
    })
    socket.connect()
  }

  function submitForm(e) {
    e.preventDefault(e)

    /* Send login request */
    let req = new XMLHttpRequest()
    req.open("POST", url + "/login")
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    req.responseType = 'json'
    req.withCredentials = true
    req.send(JSON.stringify({"phoneNum": phoneNumber, "password": password}))
    req.onload = () => {
      if(req.status === 200 && req.response["success"]) {
        console.log("Let's connect the socket boiiiiiis")
        /* Save the csrf token */
        let value = `; ${document.cookie}`;
        let parts = value.split(`; csrf_access_token=`);
        if (parts.length === 2) var token = parts.pop().split(';').shift()
        socket.io.opts.extraHeaders["X-CSRF-TOKEN"] = token
        /* Start connecting */
        connect_socket(token)
      } else {
        setShowLoginFailAlert(true)
      }
    }
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
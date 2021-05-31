import React, { useRef, useState } from "react"
import { useStore } from "../../context/store"
import { Alert } from "@material-ui/lab"
import { Link } from 'react-router-dom'

import "../../styling/login/LoginForm.css"
import { Box, Button, TextField } from "@material-ui/core"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginFailAlert, setShowLoginFailAlert] = useState(false)
  const {socket, url, actions, dispatch} = useStore()
  const formRef = useRef()

  const connect_socket = (token) => {
    socket.once("user_data", (payload) => {
      payload = JSON.parse(payload)
      let userData = {
        phoneNum: "0" + payload["phone_num"],
        nickname: payload["nickname"]
      }
      dispatch({type: actions.SET_USER_DATA, value: userData})
    })
    socket.once("connect", () => {
      dispatch({type: actions.SET_TOKEN, value: token})
      console.log("We have officially connected boiiiiiiiiiis.")
    })
    socket.connect()
  }

  function submitForm(e) {
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
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
        <form ref={formRef}>
          <Box>
            <TextField
              autoComplete="nope"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              placeholder="Phone number"
              required />
          </Box>
          <Box mb={2}>
            <TextField
              autoComplete="nope"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required/>
          </Box>
          <Box mb={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={submitForm}>
                Sign in
            </Button>
          </Box>
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
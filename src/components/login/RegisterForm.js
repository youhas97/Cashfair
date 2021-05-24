import React, { useState, useEffect} from "react"
import { useStore } from "../../context/store"
import { Redirect, Link } from 'react-router-dom'
import { io } from "socket.io-client"
import { Alert } from "@material-ui/lab"

import "../../styling/login/RegisterForm.css"

function RegisterForm() {
  const [phoneNumber, updatePhoneNumber] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")
  const [successfulRegistration, setSuccessfulRegistration] = useState(false)
  const [showRegFailAlert, setShowRegFailAlert] = useState(false)

  const { actions, dispatch } = useStore()

  var socket = io("http://localhost:5000", {
    reconnection: false,
    autoConnect:false
  })

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Sending user creds")
      socket.emit("register", phoneNumber, password)
    })

    socket.on("register_success", () => {
      setSuccessfulRegistration(true)
      console.log("User registered!")
    })

    socket.on("register_fail", () => {
      setShowRegFailAlert(true)
      console.log("User was unable to register")
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [socket])

  function submitForm(e) {
    e.preventDefault(e)

    // TODO: Check validity of phoneNumber

    if(password !== repeatPassword) {
      // TODO: popup or some other method to show user that passwords don't match
      alert("Passwords don't match!")
      return
    }

    socket.connect()
  }


  useEffect(() => {
    dispatch({type: actions.UPDATE_SUC_REG, value: successfulRegistration})
  }, [successfulRegistration])

  return (
    <div className="content-div">
      <div className="login-form">
        <h1>Register Account</h1>
        {showRegFailAlert ? <Alert style={{
          margin: "auto"
        }}
        severity="error"
        >
          Unable to register user.
        </Alert> : undefined }
        <form id="register-form">
          <input
          className="form-input"
          type="number"
          placeholder="Phone number"
          onChange={(e) => updatePhoneNumber(e.target.value)}
          required/>
          <input
          className="form-input"
          type="password"
          placeholder="Password"
          onChange={(e) => updatePassword(e.target.value)}
          required/>
          <input
          className="form-input"
          type="password"
          onChange={(e) => updateRepeatPassword(e.target.value)}
          placeholder="Repeat password"
          required/>
          <input
          className="form-btn"
          type="submit"
          onClick={submitForm}
          value="Register"/>
        </form>
      </div>
      <div>
        <Link replace to={"/login"}
          className="register-btn-text">
              Already have an account? Sign in!
        </Link>
      </div>
      {successfulRegistration ? <Redirect from="/register" to="/login" /> : undefined}
    </div>
  )
}

export default RegisterForm
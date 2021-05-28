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

  const { actions, dispatch, url } = useStore()

  function submitForm(e) {
    e.preventDefault(e)

    // TODO: Check validity of phoneNumber

    if(password !== repeatPassword) {
      // TODO: popup or some other method to show user that passwords don't match
      alert("Passwords don't match!")
      return
    }

    /* Send register request */
    let req = new XMLHttpRequest()
    req.open("POST", url + "/register")
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    req.responseType = 'json'
    req.send(JSON.stringify({"phoneNum": phoneNumber, "password": password, "nickname": "testname"}))
    req.onload = () => {
      console.log("RESPONSE: " + JSON.stringify(req.response))
      if(req.status === 200 && req.response["success"]) {
        setSuccessfulRegistration(true)
        console.log("Let's login boiiiiiiis")
      } else {
        setShowRegFailAlert(true)
      }
    }
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
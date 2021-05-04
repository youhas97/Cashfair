import React, { useContext, useState } from "react"
import { useStore } from "../../context/store"
import { io } from "socket.io-client"
import { Redirect, Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'

import "../../styling/login/LoginForm.css"
import { findAllByDisplayValue } from "@testing-library/dom"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const {actions, dispatch, store} = useStore()

  function submitForm(e) {
    e.preventDefault(e)
    const socket = store.socket
    socket.open()
    socket.on("connect", () => {
      dispatch({type: actions.UPDATE_SOCKET, value: socket})
    })
    console.log(socket)
  }

  return (
    <div className="content-div">
      <div className="login-form">
        <h1>Login</h1>
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
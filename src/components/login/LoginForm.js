import React, { useContext, useState } from "react"
import { useStore } from "../../context/store"
import { io } from "socket.io-client"

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
      dispatch({type: actions.WS_CONNECT, value: socket})
    })
    console.log(socket)
  }

  return (
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
  )
}

export default LoginForm
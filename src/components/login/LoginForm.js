import React, { useContext, useState } from "react"
import { useStore } from "../../context/store"
import { io } from "socket.io-client"

import "../../styling/login/LoginForm.css"
import { findAllByDisplayValue } from "@testing-library/dom"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const {store} = useStore()

  function submitForm(e) {
    e.preventDefault(e)
    const socket = io("http://localhost:5000", {
      reconnection: false
    })
    socket.on("connect", () => {
      console.log(socket.id)
    })
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
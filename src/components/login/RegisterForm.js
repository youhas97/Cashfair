import React, { useState, useEffect, useContext } from "react"
import { useStore } from "../../context/store"
import { io } from "socket.io-client"

import "../../styling/login/RegisterForm.css"

function RegisterForm() {
  const [phoneNumber, updatePhoneNumber] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")

  function submitForm(e) {
    e.preventDefault(e)

    // TODO: Check validity of phoneNumber

    if(password != repeatPassword) {
      // TODO: popup or some other method to show user that passwords don't match
      console.log("Passwords don't match!")
      return
    }

    let socket = io("http://localhost:5000", {
      reconnection: false
    })
    socket.on("connect", () => {
      console.log("Sending user creds")
      socket.emit("register", phoneNumber, password)
    })

    socket.on("register_success", () => {
      console.log("User registered!")
    })

    socket.on("register_fail", () => {
      console.log("User was unable to register")
    })

    socket.on("disconnect", () => {
      socket.disconnect()
    })
  }

  return (
    <div className="login-form">
      <h1>Register Account</h1>
      <form>
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
  )
}

export default RegisterForm
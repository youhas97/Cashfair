import React, { useState, useEffect, useContext } from "react"
import { useStore } from "../../context/store"

import "../../styling/login/RegisterForm.css"

function RegisterForm() {
  const [phoneNumber, updatePhoneNumber] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")

  function submitForm(e) {
    e.preventDefault(e)
  }

  return (
    <div className="LoginForm">
    <h1>Register Account</h1>
    <form onSubmit={submitForm}>
      <input
      className="formInput"
      type="number"
      placeholder="Phone number"
      onChange={(e) => updatePhoneNumber(e.target.value)}
      required/>
      <input
      className="formInput"
      type="password"
      placeholder="Password"
      onChange={(e) => updatePassword(e.target.value)}
      required/>
      <input
      className="formInput"
      type="password"
      onChange={(e) => updateRepeatPassword(e.target.value)}
      placeholder="Repeat password"
      required/>
      <input
      className="formBtn"
      type="submit"
      value="Register"/>
    </form>
  </div>
  )
}

export default RegisterForm
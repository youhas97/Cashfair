import React, { useState, useEffect, useContext } from "react"
import { useStore } from "../../context/store"

import "../../styling/login/RegisterForm.css"

function RegisterForm() {
  const [nickname, setNickName] = useState("")
  const [phoneNumber, updatePhoneNumber] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")

  function submitForm(e) {
    e.preventDefault(e)
  }

  return (
    <div className="login-form">
      <h1>Register Account</h1>
      <form>
      <input
        className="form-input"
        type="text"
        placeholder="Nickname"
        onChange={(e) => setNickName(e.target.value)}
        required/>
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
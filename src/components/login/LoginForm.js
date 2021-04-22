import React, { useState } from "react"

import "../../styling/login/LoginForm.css"

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  function submitForm(e) {
    e.preventDefault(e)
  }

  return (
    <div className="LoginForm">
      <h1>Login</h1>
      <form>
        <input
          className="formInput"
          name="phoneNumber"
          onChange={(e) => {setPhoneNumber(e.target.value)}}
          type="number"
          placeholder="Phone number"
          required/>
        <input
          className="formInput"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required/>
        <input
          className="formBtn"
          type="submit"
          onClick={submitForm}
          value="Sign in"/>
      </form>
    </div>
  )
}

export default LoginForm
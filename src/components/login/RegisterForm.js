import React from "react";

import "../../styling/login/RegisterForm.css"

function RegisterForm() {
  function handleClick(e) {
    e.preventDefault()
    alert("get fucked")
  }

  return (
    <div className="LoginForm">
      <h1>Register Account</h1>
      <form>
        <input className="formInput" type="number" placeholder="Phone number" required/>
        <input className="formInput" type="password" placeholder="Password" required/>
        <input className="formInput" type="password" placeholder="Repeat password" required/>
        <input className="formBtn" type="submit" value="Register"/>
      </form>
    </div>
  )
}

export default RegisterForm
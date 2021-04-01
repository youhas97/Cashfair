import React from "react";

import "../styling/Login.css"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

function Login() {
  function handleClick(e) {
    e.preventDefault();
    alert("get fucked");
  }
  
  return (
    <main>
      <div className="contentDiv">
       <LoginForm />
       <RegisterForm />
      </div>
    </main>
  )
}

export default Login
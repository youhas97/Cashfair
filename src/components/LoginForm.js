import React from "react";

import "../styling/LoginForm.css"

function LoginForm() {
  function handleClick(e) {
    e.preventDefault(e);
    alert("get fucked");
  }
  
  return (
    <div className="LoginForm">
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

export default LoginForm
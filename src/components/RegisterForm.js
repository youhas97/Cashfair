import React from "react";

import "../styling/RegisterForm.css"

function RegisterForm() {
  function handleClick(e) {
    e.preventDefault();
    alert("get fucked");
  }
  
  return (
    <div className="RegisterForm">
      <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

export default RegisterForm
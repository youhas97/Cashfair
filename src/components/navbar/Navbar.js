import React, { useState } from "react";

import "../../styling/navbar/Navbar.css"
import NavButton from "./NavButton"

import buttonData from "../../data/buttonData"

function Navbar(props) {
  const [buttons, setButtons] = useState(localStorage.btnData ? JSON.parse(localStorage.btnData) : buttonData)

  function handleChange(id) {
    setButtons(prevButtons => prevButtons.map(btn => {
      btn.active = (btn.id === id) ? true : false
      return btn
    }))

    localStorage.btnData = JSON.stringify(buttons)
  }

  const navButtons = buttons.map(btn =>
    <NavButton key={btn.id} item={btn} handleChange={handleChange}/>)

  return (
  <nav className="Navbar">
    {navButtons}
  </nav>
  )
}

export default Navbar

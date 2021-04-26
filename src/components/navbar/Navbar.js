import React, { useState, useEffect } from "react"

import "../../styling/navbar/Navbar.css"
import NavButton from "./NavButton"

import buttonData from "../../data/buttonData"

function Navbar() {
  const [buttons, setButtons] = useState(localStorage.btnData ? JSON.parse(localStorage.btnData) : buttonData)

  function handleChange(id) {
    // Button id is always the same as index
    if (buttons[id].menuItems) return // dropdown menus should not be active when clicked.
    setButtons(prevButtons => prevButtons.map(btn => {
      btn.active = (btn.id === id) ? true : false
      return btn
    }))
  }

  useEffect(() => {
    localStorage.btnData = JSON.stringify(buttons)
  }, [buttons])

  const navButtons = buttons.map(btn =>
    <NavButton key={btn.id} item={btn} handleChange={handleChange}/>)

  return (
  <nav className="Navbar">
    {navButtons}
  </nav>
  )
}

export default Navbar

import React, { useState } from "react"

import "../../styling/navbar/Navbar.css"
import NavButton from "./NavButton"

import buttonData from "../../data/buttonData"

function Navbar() {
  const [buttons] = useState(buttonData)

  const navButtons = buttons.map(btn =>
    <NavButton key={btn.id} item={btn} />)

  return (
  <nav className="navbar">
    {navButtons}
  </nav>
  )
}

export default Navbar

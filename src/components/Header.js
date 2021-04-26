import React from "react"

import "../styling/Header.css"
import Navbar from "./navbar/Navbar"

function Header() {
  return (
    <header className="Header">
      <Navbar />
    </header>
  )
}

export default Header
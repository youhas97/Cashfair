import React from "react";

import "../styling/Header.css"
import NavButton from "./NavButton";

function Header() {
  return (
    <header className="Header">
      <nav>
        <NavButton name="Home"/>
        <NavButton name="Balance"/>
        <NavButton name="Groups"/>
        <NavButton className="toTheRight" name="Account"/>
        <NavButton className="toTheRight" name="Settings" />
      </nav>
    </header>
  )
}

export default Header
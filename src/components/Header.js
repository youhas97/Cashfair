import React from "react";

import "../styling/Header.css"
import Navbar from "./Navbar";
import NavButton from "./NavButton";

function Header() {
  return (
    <header className="Header">
      <Navbar />
      {/* 
      <nav>
        <NavButton name="Home"/>
        <NavButton name="Balance"/>
        <NavButton name="Groups"/>
        <NavButton className="toTheRight" name="Settings"/>
        <NavButton className="toTheRight" name="Account" />
      </nav>
      */}
    </header>
  )
}

export default Header
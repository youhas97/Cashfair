import React from "react"
import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenuItem(props) {

  return (
    <div className="nav-menu-item" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default NavDropdownMenuItem;
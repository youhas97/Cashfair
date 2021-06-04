import React from "react"
import NavDropdownMenuItem from "./NavDropdownMenuItem"
import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenu(props) {
  var key=0;
  const menuItems = props.menuItems.map(item =>
  <NavDropdownMenuItem
    onClick={props.menuItems[item]}
    key={key++}
    text={item} />)

  return (
    <ul className="nav-menu-list" >
      {menuItems}
    </ul>
  )
}

export default NavDropdownMenu;
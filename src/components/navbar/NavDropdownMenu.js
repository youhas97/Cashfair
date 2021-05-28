import React from "react"
import NavDropdownMenuItem from "./NavDropdownMenuItem"
import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenu(props) {

  const handleClick = () => {
    alert("Clicked!")
  }

  const menuItems = []
  var key = 0;
  Object.keys(props.menuItems).forEach(item => {
    menuItems.push(
    <NavDropdownMenuItem
      onClick={props.menuItems[item]}
      key={key++}>
      {item}
    </NavDropdownMenuItem>)})

  return (
    <ul className="nav-menu-list" >
      {menuItems}
    </ul>
  )
}

export default NavDropdownMenu;
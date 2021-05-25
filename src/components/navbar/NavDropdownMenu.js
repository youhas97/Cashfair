import React from "react"
import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenu(props) {

  const menuItems = props.menuItems.map(item => <div key={props.menuItems.indexOf(item)} className="nav-menu-item">{item}</div>)

  return (
    <ul className="nav-menu-list" >
      {menuItems}
    </ul>
  )
}

export default NavDropdownMenu;
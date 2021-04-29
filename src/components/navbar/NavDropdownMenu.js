import React from "react"
import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenu(props) {

  const menuItems = props.item.menuItems.map(item => <div className="nav-menu-item">{item}</div>)

  return (
    <ul className="nav-menu-list" >
      {menuItems}
    </ul>
  )
}

export default NavDropdownMenu;
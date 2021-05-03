import React from "react"

import { NavLink } from 'react-router-dom'

import "../../styling/navbar/NavButton.css"

import NavDropdownMenu from "./NavDropdownMenu"

function NavButton(props) {

  const menuItems = props.item.menuItems ? props.item.menuItems : undefined

  return (
    <NavLink className = "nav-button-div"
    activeClassName = "active"
    style = {{float: props.item.float}}
    to={() => {
      if (props.item.pathName) return props.item.pathName
      else return {} // Do not want drop-down menus to reroute somewhere
    }}
    exact isActive={(match, location) => {
      if(!match)
        return false
      return true
    }}
    >
      <label className = "nav-button-text">
        {props.item.name}
      </label>
      <div class="nav-menu-bridge">
        {menuItems ? <NavDropdownMenu item={{menuItems: menuItems}} /> : undefined}
      </div>
    </NavLink>
  )
}

export default NavButton;
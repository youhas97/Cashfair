import React from "react"

import { Link } from 'react-router-dom'

import "../../styling/navbar/NavButton.css"

import NavDropdownMenu from "./NavDropdownMenu"

function NavButton(props) {

  function handleClick() {
    props.handleChange(props.item.id)
  }

  const menuItems = props.item.menuItems ? props.item.menuItems : undefined

  return (
    <Link className = {"nav-button-div " + (props.item.active ? "active" : "")}
    style = {{float: props.item.float}}
    to={() => {
      if (props.item.pathName) return props.item.pathName
      else return // Do not want drop-down menus to reroute somewhere
    }}
    onClick = {handleClick}>
      <label className = "nav-button-text">
        {props.item.name}
      </label>
      <div class="nav-menu-bridge">
        {menuItems ? <NavDropdownMenu item={{menuItems: menuItems}} /> : undefined}
      </div>
    </Link>
  )
}

export default NavButton;
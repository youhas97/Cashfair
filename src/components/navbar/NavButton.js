import React, { useState } from "react"
import { useDispatch } from "react-redux"

import "../../styling/navbar/NavButton.css"

import NavDropdownMenu from "./NavDropdownMenu"

function NavButton(props) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  function handleClick(e) {
    e.preventDefault(e);
    props.handleChange(props.item.id)
    dispatch({type: "DROPDOWN"})
  }

  const menuItems = props.item.menuItems ? props.item.menuItems : undefined

  return (
    <div className={"nav-button-div " + (props.item.active ? "active" : "")}
    style={{float: props.item.float}}
    onClick = {handleClick}
    >
      <a className = "nav-button-text">{props.item.name}</a>
      <div class="nav-menu-bridge">
        {menuItems ? <NavDropdownMenu item={{menuItems: menuItems}} /> : undefined}
      </div>
    </div>
  )
}

export default NavButton;
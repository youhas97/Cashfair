import React from "react"
import { useDispatch } from "react-redux"

import "../../styling/navbar/NavButton.css"

import NavDropdownMenu from "./NavDropdownMenu"

function NavButton(props) {
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault(e);
    props.handleChange(props.item.id)
    dispatch({type: "DROPDOWN"})
  }

  return (
    <div className={"navButtonDiv " + (props.item.active ? "active" : "")}
    style={{float: props.item.float}}
    onClick = {handleClick}>
      <a className = "navButtonText">
        {props.item.name}
      </a>
      {props.item.dropdown ? "hello" : "hejdå"}
      {props.item.dropdown ? <NavDropdownMenu /> : undefined}
    </div>
  )
}

export default NavButton;
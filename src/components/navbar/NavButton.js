import React from "react";
import { useDispatch } from "react-redux"

import "../../styling/navbar/NavButton.css"

function NavButton(props) {
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault(e);
    props.handleChange(props.item.id)
    dispatch({type: e.target.innerHTML})
  }

  return (
    <div className={"navButtonDiv " + (props.item.active ? "active" : "")}
    style={{float: props.item.float}}
    onClick = {handleClick}>
      <a
        className = "navButtonText"
      >
        {props.item.name}
      </a>
    </div>
  )
}

export default NavButton;
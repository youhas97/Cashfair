import React from "react";

import "../../styling/navbar/NavButton.css"

function NavButton(props) {
  function handleClick(e) {
    e.preventDefault(e);
    props.handleChange(props.item.id)
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
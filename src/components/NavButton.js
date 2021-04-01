import React from "react";

import "../styling/NavButton.css"

function NavButton(props) {
  function handleClick(e) {
    e.preventDefault(e);
    alert(props.name);
  }

  return (
    <div className={"navBarDiv " + (props.className || "toTheLeft")}>
    <a 
      className = "navBarText"
      onClick = {handleClick}
    >
        {props.name}
      </a>
    </div>
  )
}

export default NavButton;
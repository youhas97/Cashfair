import React, { useState } from "react"
import { Collapse } from "@material-ui/core"
import { useSelector } from "react-redux"

import "../../styling/navbar/NavDropdownMenu.css"

function NavDropdownMenu(props) {
  const [show, toggleShow] = useState(true)
  //useSelector(button => toggleShow(button.dropdown))

  return <h1>Henlo</h1>

  return (
    <Collapse in={show}>
      <h1>This is a text</h1>
    </Collapse>
  )
}

export default NavDropdownMenu;
import React, { useState } from "react"
import { Collapse } from "@material-ui/core"

import "../styling/CollapsibleComponent.css"

function CollapsibleComponent(props) {
  const [show, toggleShow] = useState(true)

  return(
    <div className="collapsible-component-container">
      <div className="collapse-div-bar"  onClick={() => toggleShow(prevShow => !prevShow)}>
          <label className="collapse-bar-title" >{props.item.title}</label>
          <label className="collapse-button">{show ? "-" : "+"}</label>
      </div>
      <Collapse in={show}>
        <div className={props.item.className}>
          {props.item.children}
        </div>
      </Collapse>
    </div>
  )
}

export default CollapsibleComponent
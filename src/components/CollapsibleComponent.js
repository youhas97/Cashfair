import React, { useState } from "react"
import { Collapse } from "@material-ui/core"

import "../styling/CollapsibleComponent.css"
import OverviewCard from "./dashboard/OverviewCard"

function CollapsibleComponent(props) {
  const [show, toggleShow] = useState(true)

  return(
    <div className="collapsible-component-container">
      <div className="collapse-div-bar"  onClick={() => toggleShow(prevShow => !prevShow)}>
          <label className="collapse-bar-title" >{props.item.title}</label>
          <a className="collapse-button">{show ? "-" : "+"}</a>
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
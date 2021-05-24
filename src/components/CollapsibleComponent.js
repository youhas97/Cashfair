import React, { useState } from "react"
import { Collapse } from "@material-ui/core"

import "../styling/CollapsibleComponent.css"

function CollapsibleComponent(props) {
  const [show, toggleShow] = useState(true)

  return(
    <div className="collapsible-component-container">
      <div className="collapse-div-bar"  onClick={() => toggleShow(prevShow => !prevShow)}>
          <label className="collapse-bar-title" >
            {props.title + (props.totalBalance ? " :" : "")}
          </label>
          <label className={"collapse-bar-balance " + (props.totalBalance >= 0 ? "collapse-bar-pos" : "collapse-bar-neg")}>
            {props.totalBalance}
          </label>
          <label className="collapse-button">
            {show ? "-" : "+"}
          </label>
      </div>
      <Collapse in={show}>
        <div className={props.className}>
          {props.children}
        </div>
      </Collapse>
    </div>
  )
}

export default CollapsibleComponent
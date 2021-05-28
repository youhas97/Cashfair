import React from "react"

import {ListItem, ListItemText} from "@material-ui/core"
import BalanceText from "./BalanceText"

function BalanceListItem(props) {
  const handleClick = (e) => {
    e.preventDefault(e)
    alert("Make Swish API call")
  }

  return (
    <ListItem divider={true} button={props.clickable} onClick={handleClick}>
      <ListItemText primary={props.name} />
      {props.value ? <BalanceText value={props.value}></BalanceText> : undefined}
    </ListItem>
  )
}

export default BalanceListItem
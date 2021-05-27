import React from "react"

import {ListItem, ListItemText} from "@material-ui/core"
import BalanceText from "./BalanceText"

function BalanceListItem(props) {

  return (
    <ListItem divider={true} button={props.clickable}>
      <ListItemText primary={props.name} />
      {props.value ? <BalanceText value={props.value}></BalanceText> : undefined}
    </ListItem>
  )
}

export default BalanceListItem
import React from "react"

import {ListItem, ListItemText} from "@material-ui/core"
import BalanceText from "../balance/BalanceText"

function GroupBalanceListItem(props) {

  return (
    <ListItem divider={true} button={props.clickable}>
      <ListItemText primary={props.name} />
      {props.value ? <BalanceText value={props.value}></BalanceText> : undefined}
    </ListItem>
  )
}

export default GroupBalanceListItem
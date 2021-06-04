import React, { useEffect, useState } from "react"
import {ListItem, ListItemText, Box } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import BalanceText from "./BalanceText"
import BalanceListItemDialog from "./BalanceListItemDialog"

function BalanceListItem(props) {
  const [renderDialog, setRenderDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")

  return (
    <Box>
      {showAlert ?
        <Alert variant="filled" className="alert"
        onClose={() => setShowAlert(false)}>
          {alertText}
        </Alert> : undefined}
      <ListItem divider={true} button={props.clickable} onClick={() => (props.clickable ? setRenderDialog(true) : undefined)}>
        <ListItemText primary={props.name} />
        {props.value ? <BalanceText value={props.value} /> : undefined}
      </ListItem>
      { renderDialog ?
        <BalanceListItemDialog
          number={props.number}
          name={props.name}
          type={props.type}
          groupId={props.groupId}
          setShowAlert={setShowAlert}
          setAlertText={setAlertText}
          setRenderDialog={setRenderDialog} />
        : undefined}
    </Box>
  )
}

export default BalanceListItem

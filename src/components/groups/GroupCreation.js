import React, { useState } from "react"
import { Button, Box } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import "../../styling/groups/Groups.css"
import GroupCreationDialog from "./GroupCreationDialog"

function GroupCreation() {
  const [ renderDialog, setRenderDialog] = useState(false)
  const [ showAlert, setShowAlert ] = useState(false)
  const [ alertText, setAlertText ] = useState("")

  return (
    <div className="create-group-btn">
    {showAlert ?
          <Alert variant="filled" className="alert"
          onClose={() => setShowAlert(false)}>
            {alertText}
          </Alert> : undefined}
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={() => setRenderDialog(true)}>
          Create new group
        </Button>
      </Box>
      { renderDialog ?
        <GroupCreationDialog
          setRenderDialog={setRenderDialog}
          setShowAlert={setShowAlert}
          setAlertText={setAlertText}/>
      : undefined}
    </div>
  )
}

export default GroupCreation
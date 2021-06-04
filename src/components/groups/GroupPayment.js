import React, { useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Box, Button } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import GroupPaymentDialog from "./GroupPaymentDialog"
import { useGroupStore } from "../../context/groupStore"
import { useStore } from "../../context/store"

function GroupPayment() {
  const [renderDialog, setRenderDialog] = useState(false)
  const { groups, selectedGroup, selectedMembers, amount } = useGroupStore()
  const { store, socket } = useStore()
  const [ showAlert, setShowAlert ] = useState(false)
  const [ showDialogAlert, setShowDialogAlert ] = useState(false)
  const [ alertText, setAlertText ] = useState("")
  const [ isErrorAlert, setIsErrorAlert ] = useState(false)
  const formRef = useRef()

  const handleOpen = (e) => {
    e.preventDefault(e)
    // Check to see if member is part of any groups
    if(Array.isArray(groups) && groups.length) {
      setShowDialogAlert(false)
      setIsErrorAlert(false)
      setRenderDialog(true)
    }
    else {
      setIsErrorAlert(true)
      setAlertText("You are not part of any groups.")
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 6000)
    }
  }

  return (
    <div className="create-group-btn">
      {showAlert ?
          <Alert variant="filled" severity={isErrorAlert ? "error" : "success"} className="alert"
          onClose={() => setShowAlert(false)}>
            {alertText}
          </Alert> : undefined}
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Register new payment
        </Button>
      </Box>
      {renderDialog ?
      <GroupPaymentDialog
        setRenderDialog={setRenderDialog}
        setShowAlert={setShowAlert}
        setAlertText={setAlertText}
        /> : undefined}
    </div>
  )
}

export default GroupPayment
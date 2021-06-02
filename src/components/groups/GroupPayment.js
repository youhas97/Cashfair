import React, { useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import GroupPaymentForm from "./GroupPaymentForm"
import { useGroupStore } from "../../context/groupStore"
import { useStore } from "../../context/store"
import { Widgets } from "@material-ui/icons"

function GroupPayment() {
  const [open, setOpen] = useState(false)
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
      setOpen(true)
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

  const handleClose = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      if(amount > 0) {
        socket.once("register_group_payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            setIsErrorAlert(false)
            setAlertText(payload["msg"])
            setShowAlert(true)
            setTimeout(() => {
              setShowAlert(false)
            }, 6000)
            setOpen(false)
          }
          else
            setAlertText(payload["msg"])
            setShowDialogAlert(true)
        })
        let payload = {
          "requester_phone_num": store.userData.phoneNum,
          "selected_group_id": selectedGroup["id"],
          "selected_members": selectedMembers,
          "amount": amount
        }
        socket.emit("register_group_payment", JSON.stringify(payload))
      }
      else {
        setAlertText("Amount has to be greater than 0.")
        setShowDialogAlert(true)
      }
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
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <DialogTitle className="create-group-title">Group Payment</DialogTitle>
        <Box>
          {showDialogAlert ? <Alert style={{
              margin: "auto",
              maxWidth: "100%"
            }}
            severity="error"
            >
              {alertText}
            </Alert> : undefined }
        </Box>
        <DialogContent className="create-group-modal-content">
          <form ref={formRef}>
            <GroupPaymentForm />
          </form>
        </DialogContent>
        <DialogActions className="create-group-modal-content">
          <Button onClick={handleClose} color="secondary" >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary" >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default GroupPayment
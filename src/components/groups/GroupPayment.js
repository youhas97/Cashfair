import React, { useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import GroupPaymentForm from "./GroupPaymentForm"
import { useGroupStore } from "../../context/groupStore"

function GroupPayment() {
  const [open, setOpen] = useState(false)
  const { groups, selectedGroup, selectedMembers } = useGroupStore()
  const [ showAlert, setShowAlert ] = useState(false)
  const formRef = useRef()

  const handleOpen = (e) => {
    e.preventDefault(e)
    if(Array.isArray(groups) && groups.length)
      setOpen(true)
    else {
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
    // TODO: Transmit group data to server using API
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      console.log("SEL_GRP: " + JSON.stringify(selectedGroup))
      console.log("SEL_MEM: " + JSON.stringify(selectedMembers))
      alert("forms are valid")
      setOpen(false)
    }
  }

  return (
    <div className="create-group-btn">
      {showAlert ?
          <Alert severity="error" className="alert alert-style-error"
          onClose={() => setShowAlert(false)}>
            You are not part of any groups.
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
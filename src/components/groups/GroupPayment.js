import React, { useRef, useState } from "react"

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import GroupPaymentForm from "./GroupPaymentForm"
import { useGroupStore } from "../../context/groupStore"

function GroupPayment() {
  const [open, setOpen] = useState(false)
  const { groups, selectedGroup, selectedMembers, actions, dispatch } = useGroupStore()
  const formRef = useRef()

  const handleOpen = (e) => {
    e.preventDefault(e)
    if(Array.isArray(groups) && groups.length)
      setOpen(true)
    else alert("You are not part of any groups")
  }

  const handleClose = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  const handleSubmit = (e) => {
    // TODO: Transmit group data to server using API
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      console.log("forms are valid")
      setOpen(false)
    }
  }

  return (
    <div className="create-group-btn">
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
import React, { useState } from "react"
import { useGroupStore } from "../../context/groupStore"

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"

import "../../styling/groups/GroupCreation.css"
import GroupPaymentForm from "./GroupPaymentForm"

function GroupPayment() {
  const [open, setOpen] = useState(false)
  const {groupData} = useGroupStore()

  const handleOpen = (e) => {
    e.preventDefault(e)
    setOpen(true)
  }

  const handleClose = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  const handleSubmit = (e) => {
    // TODO: Transmit group data to server using API
    e.preventDefault(e)
    console.log(groupData.name)
    var members = groupData.members
    for (const key in groupData.members) {
      console.log("name: " + members[key].name + " num: " + members[key].phoneNum)
    }
    setOpen(false)
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
          <GroupPaymentForm />
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
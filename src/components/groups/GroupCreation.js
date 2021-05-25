import React, { useEffect, useState } from "react"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

import "../../styling/groups/GroupCreation.css"
import GroupCreationForm from "./GroupCreationForm"

function GroupCreation() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  const handleOpen = (e) => {
    e.preventDefault(e)
    setOpen(true)
  }

  const handleClose = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  return (
    <div className="create-group-btn">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create new group
      </Button>
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <DialogTitle className="create-group-title">Group Creation</DialogTitle>
        <DialogContent className="create-group-modal-content">
          <GroupCreationForm />
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

export default GroupCreation
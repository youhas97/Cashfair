import React, { useRef, useState } from "react"
import { useGroupCreationStore } from "../../context/groupCreationStore"
import { useStore } from "../../context/store"
import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import "../../styling/groups/Groups.css"
import GroupCreationForm from "./GroupCreationForm"

function GroupCreation() {
  const [open, setOpen] = useState(false)
  const { groupData } = useGroupCreationStore()
  const { socket, store } = useStore()
  const [ showAlert, setShowAlert ] = useState(false)
  const [alertText, setAlertText] = useState("")
  const formRef = useRef()

  const handleOpen = (e) => {
    e.preventDefault(e)
    setShowAlert(false)
    setOpen(true)
  }

  const handleClose = (e) => {
    e.preventDefault(e)
    setOpen(false)
  }

  const handleSubmit = () => {
    if (formRef.current.reportValidity()) {
      let members = []
      for (const key in groupData.members) {
        members.push({
          nickname: groupData.members[key].name,
          phone_num: groupData.members[key].phoneNum
        })
      }
      let payload = {
        name: groupData.name,
        members: members
      }
      socket.once("create_group_response", (payload) => {
        payload = JSON.parse(payload)
        if(payload["success"]) {
          setOpen(false)
        } else {
          setShowAlert(true)
          setAlertText(payload["msg"])
        }
      })
      socket.emit("create_group", JSON.stringify(payload))
    }
  }

  return (
    <div className="create-group-btn">
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create new group
        </Button>
      </Box>
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <form ref={formRef} >
          <DialogTitle className="create-group-title">Group Creation</DialogTitle>
          {showAlert ? <Alert style={{
            margin: "auto",
            maxWidth: "500px"
          }}
          severity="error"
          >
            {alertText}
          </Alert> : undefined }
          <DialogContent className="create-group-modal-content">
            <GroupCreationForm />
          </DialogContent>
          <DialogActions className="create-group-modal-content">
            <Button onClick={handleClose} color="secondary" >
              Cancel
            </Button>
            <Button onClick={handleSubmit}
              color="secondary" >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default GroupCreation
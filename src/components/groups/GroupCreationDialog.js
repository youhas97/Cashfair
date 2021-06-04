import React, { useRef, useState } from "react"
import { useGroupCreationStore } from "../../context/groupCreationStore"
import { useStore } from "../../context/store"
import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import "../../styling/groups/Groups.css"
import GroupCreationForm from "./GroupCreationForm"

function GroupCreation(props) {
  const { groupData } = useGroupCreationStore()
  const { socket } = useStore()
  const [ showDialogAlert, setShowDialogAlert ] = useState(false)
  const [ alertText, setAlertText ] = useState("")
  const formRef = useRef()

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
          props.setAlertText(payload["msg"])
          props.setShowAlert(true)
          setTimeout(() => {
            props.setShowAlert(false)
          }, 6000)
          props.setRenderDialog(false)
        } else {
          setAlertText(payload["msg"])
          setShowDialogAlert(true)
        }
      })
      socket.emit("create_group", JSON.stringify(payload))
    }
  }

  return (
    <Dialog
    className="create-group-modal"
    open={true} >
        <DialogTitle className="create-group-title">Group Creation</DialogTitle>
        <Box>
          {showDialogAlert ? <Alert style={{
            margin: "auto",
            maxWidth: "500px"
          }}
          severity="error"
          >
            {alertText}
          </Alert> : undefined }
        </Box>
        <DialogContent className="create-group-modal-content">
          <form ref={formRef} >
            <GroupCreationForm />
          </form>
        </DialogContent>
        <DialogActions className="create-group-modal-content">
          <Button onClick={() => props.setRenderDialog(false)} color="secondary" >
            Cancel
          </Button>
          <Button onClick={handleSubmit}
            color="secondary" >
            Create Group
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default GroupCreation
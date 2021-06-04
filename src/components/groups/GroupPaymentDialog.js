import React, { useEffect, useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import "../../styling/groups/Groups.css"
import GroupPaymentForm from "./GroupPaymentForm"
import { useGroupStore } from "../../context/groupStore"
import { useStore } from "../../context/store"

function GroupPaymentDialog(props) {
  const { selectedGroup, selectedMembers, amount } = useGroupStore()
  const { store, socket } = useStore()
  const [ showDialogAlert, setShowDialogAlert ] = useState(false)
  const [ alertText, setAlertText ] = useState("")
  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      if(amount > 0) {
        socket.once("register_group_payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            props.setAlertText(payload["msg"])
            props.setShowAlert(true)
            setTimeout(() => {
              props.setShowAlert(false)
            }, 6000)
            props.setRenderDialog(false)
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
    <Dialog
      className="create-group-modal"
      open={true}>
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
        <Button onClick={() => props.setRenderDialog(false)} color="secondary" >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" >
          Register Payment
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GroupPaymentDialog
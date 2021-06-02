import React, { useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import PaymentCreationForm from "./PaymentCreationForm"
import { useStore } from "../../context/store"

function PaymentCreation(props) {
  const [open, setOpen] = useState(false)
  const { store, socket } = useStore()
  const [phoneNum, setPhoneNum] = useState()
  const [nickname, setNickname] = useState("")
  const [amount, setAmount] = useState("")
  const [showAlert, setShowAlert] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      if (amount > 0) {
        let payload = {
          "user_phone": store.userData.phoneNum,
          "payment_phone": phoneNum,
          "payment_nickname": nickname,
          "payment_amount": !props.type ? amount : -amount
        }

        socket.once("register_payment_response", (resp) => {
          resp = JSON.parse(resp)
          if(resp["success"])
            // TODO: Show alert for success
            setOpen(false)
          else
            // TODO: Show alert for fail
            setShowAlert(true)
            setAlertText(resp.msg)
        })

        socket.emit("register_payment", JSON.stringify(payload))
      }
      else {
        setShowAlert(true)
        setAlertText("Amount has to be greater than 0")
      }
    }
  }

  return (
    <div className="create-group-btn">
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Register New {!props.type? "Payment" : props.type }
        </Button>
      </Box>
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <form ref={formRef} >
          <DialogTitle className="create-group-title">Register {!props.type ? "Payment" : props.type}</DialogTitle>
          <Box>
            {showAlert ? <Alert style={{
              margin: "auto",
              maxWidth: "250px"
            }}
            severity="error"
            >
              {alertText}
            </Alert> : undefined }
          </Box>
          <DialogContent className="create-group-modal-content">
            <PaymentCreationForm setPhoneNum={setPhoneNum} setNickname={setNickname} setAmount={setAmount} />
          </DialogContent>
          <DialogActions className="create-group-modal-content">
            <Button onClick={handleClose} color="secondary" >
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary" >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default PaymentCreation
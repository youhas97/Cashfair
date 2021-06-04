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
  const [showDialogAlert, setShowDialogAlert] = useState(false)
  const [alertText, setAlertText] = useState("")


  const formRef = useRef()

  const handleOpen = (e) => {
    e.preventDefault(e)
    setShowDialogAlert(false)
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

        socket.once("register_payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            setAlertText(payload["msg"])
            setShowAlert(true)
            setTimeout(() => {
              setShowAlert(false)
            }, 6000)
            setOpen(false)
          }
          else {
            setAlertText(payload["msg"])
            setShowDialogAlert(true)
          }
        })

        socket.emit("register_payment", JSON.stringify(payload))
      }
      else {
        setShowDialogAlert(true)
        setAlertText("Amount has to be greater than 0")
      }
    }
  }

  return (
    <div className="create-group-btn">
      {showAlert ?
          <Alert variant="filled" className="alert"
          onClose={() => setShowAlert(false)}>
            {alertText}
          </Alert> : undefined}
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
            {showDialogAlert ? <Alert style={{
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
              {"Register " + (props.type ? props.type : "payment")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default PaymentCreation
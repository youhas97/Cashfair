import React, { useState } from "react"

import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@material-ui/core"

import "../../styling/groups/GroupCreation.css"
import PaymentCreationForm from "./PaymentCreationForm"
import { useStore } from "../../context/store"

function PaymentCreation() {
  const [open, setOpen] = useState(false)
  const { store, socket } = useStore()

  const [phoneNum, setPhoneNum] = useState()
  const [nickname, setNickname] = useState("")
  const [amount, setAmount] = useState("")

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
    let payload = {
      "user_phone": store.userData.phoneNum,
      "payment_phone": phoneNum,
      "payment_nickname": nickname,
      "payment_amount": amount
    }

    socket.once("register_payment_response", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        // TODO: Show alert for success
        setOpen(false)
      else
        // TODO: Show alert for fail
        console.log("Payment failed: " + resp)
    })

    socket.emit("register_payment", JSON.stringify(payload))
  }

  return (
    <div className="create-group-btn">
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Register New Payment
        </Button>
      </Box>
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <DialogTitle className="create-group-title">Register Payment</DialogTitle>
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
      </Dialog>
    </div>
  )
}

export default PaymentCreation
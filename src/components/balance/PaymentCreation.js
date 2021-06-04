import React, { useRef, useState } from "react"
import { Alert } from "@material-ui/lab"
import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle } from "@material-ui/core"

import "../../styling/groups/Groups.css"
import PaymentCreationForm from "./PaymentCreationForm"
import PaymentCreationDialog from "./PaymentCreationDialog"
import { useStore } from "../../context/store"

function PaymentCreation(props) {
  const [open, setOpen] = useState(false)
  const { store, socket } = useStore()
  const [phoneNum, setPhoneNum] = useState()
  const [nickname, setNickname] = useState("")
  const [amount, setAmount] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [ renderPaymentDialog, setRenderPaymentDialog ] = useState(false)


  const formRef = useRef()

  return (
    <div className="create-group-btn">
      {showAlert ?
          <Alert variant="filled" className="alert"
          onClose={() => setShowAlert(false)}>
            {alertText}
          </Alert> : undefined}
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={() => setRenderPaymentDialog(true)}>
          Register New {!props.type ? "Payment" : props.type }
        </Button>
      </Box>
      {renderPaymentDialog ?
      <PaymentCreationDialog type={props.type} setAlertText={setAlertText} setShowAlert={setShowAlert} setRenderPaymentDialog={setRenderPaymentDialog} />
      : undefined}
    </div>
  )
}

export default PaymentCreation
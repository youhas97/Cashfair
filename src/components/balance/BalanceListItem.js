import React, { useRef, useState } from "react"
import {ListItem, ListItemText, Button, Dialog,
  DialogActions, DialogContent, Box, DialogTitle,
  TextField, FormControlLabel, Checkbox, Stepper } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import BalanceText from "./BalanceText"
import { useStore } from "../../context/store"

function BalanceListItem(props) {
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showDialogAlert, setShowDialogAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [ payWithSwish, setPayWithSwish] = useState(false)
  const [amount, setAmount] = useState("")
  const { store, socket } = useStore()
  const [ showQRCode, setShowQRCode ] = useState(false)
  const formRef = useRef()

  const handleClick = (e) => {
    e.preventDefault(e)
    setShowAlert(false)
    setShowQRCode(false)
    setPayWithSwish(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getSwishQRCode = (payee, amount) => {
    let swish_url = "https://mpc.getswish.net/qrg-swish"
    /* Send Swish QR Code request */
    let req = new XMLHttpRequest()
    req.open("POST", swish_url + "/api/v1/prefilled")
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    req.responseType = 'json'
    req.withCredentials = true

    req.send(JSON.stringify({
      "format": "svg",
      "payee": {
        value: payee,
        editable: false
      },
      "amount": {
        value: amount,
        editable: false
      },
      message: {
        value: "CashFair payment",
        editable: false
      },
    }))

    req.onload = () => {
      if(req.status === 200) {
        setShowQRCode(true)
        console.log(req)
      } else {
        setAlertText("Swish QR Code retrieval error.")
        setShowDialogAlert(true)
      }
    }
  }

  const handleSubmit = () => {
    if( formRef.current.reportValidity()) {
      if (amount > 0) {
        socket.on("payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            if (payWithSwish) {
              getSwishQRCode(props.number, amount)
            }

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
        let payload = {
          "payer": store.userData.phoneNum,
          "payee": props.number,
          "amount": amount,
        }
        if( props.type === "group") {
          payload["group_id"] = props.groupId
          socket.emit("pay_group_user", JSON.stringify(payload))
        } else {
          socket.emit("pay_user", JSON.stringify(payload))
        }
      } else {
        setAlertText("Amount has to be greater than 0.")
        setShowDialogAlert(true)
      }
    }
  }

  return (
    <Box>
      {showAlert ?
        <Alert variant="filled" className="alert"
        onClose={() => setShowAlert(false)}>
          {alertText}
        </Alert> : undefined}
      <ListItem divider={true} button={props.clickable} onClick={props.clickable ? handleClick : undefined}>
        <ListItemText primary={props.name} />
        {props.value ? <BalanceText value={props.value} /> : undefined}
      </ListItem>
      <Dialog
      className="create-group-modal"
      open={open}
      onClose={handleClose} >
        <form ref={formRef}>
          <DialogTitle className="uncapitalized-dialog-title">Payment to {props.name}</DialogTitle>
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
            <Box>
              <FormControlLabel control={
                  <Checkbox checked={payWithSwish} onChange={() => setPayWithSwish(!payWithSwish)} />
                }
                label="Pay with Swish" />
            </Box>
            <Box>
              <TextField onChange={(e) => setAmount(e.target.value)} type="number"
                required autoComplete="nope" className="create-group-input" color="secondary" label="Amount"/>
            </Box>
          </DialogContent>
          <DialogActions className="create-group-modal-content">
            <Button onClick={handleClose} color="secondary" >
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary" >
              Register Payment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default BalanceListItem
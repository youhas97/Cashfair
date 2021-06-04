import React, { useRef, useState } from "react"
import {ListItem, ListItemText, Button, Dialog,
  DialogActions, DialogContent, Box, DialogTitle,
  TextField, FormControlLabel, Checkbox } from "@material-ui/core"
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
  const [ qrCode, setQRCode ] = useState("")
  const formRef = useRef()

  const handleClick = (e) => {
    e.preventDefault(e)
    setShowAlert(false)
    setShowQRCode(false)
    setPayWithSwish(false)
    setOpen(true)
  }

  const handleSubmit = () => {
    if( formRef.current.reportValidity()) {
      if (amount > 0) {
        socket.on("payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            setAlertText(payload["msg"])
            if(payWithSwish) {
              setQRCode(payload["qr_code"])
              setShowQRCode(true)
            }
            else {
              setShowAlert(true)
              setTimeout(() => {
                setShowAlert(false)
              }, 6000)
              setOpen(false)
            }
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
          "pay_with_swish": payWithSwish
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
      open={open}>
        <form ref={formRef}>
          <DialogTitle className="uncapitalized-dialog-title">
            {showQRCode ? alertText : ("Payment to " + props.name)}
          </DialogTitle>
          { showQRCode ?
          <Box>
            <DialogContent className="create-group-modal-content">
              <Box textAlign="center">
                <img src={`data:image/png;base64, ${qrCode}`}  />
              </Box>
            </DialogContent>
            <DialogActions className="create-group-modal-content">
              <Button onClick={() => setOpen(false)} color="secondary" >
                Close
              </Button>
            </DialogActions>
          </Box>
          :
          <Box>
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
              <Button onClick={() => setOpen(false)} color="secondary" >
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="secondary" >
                Register Payment
              </Button>
            </DialogActions>
          </Box>
          }
        </form>
      </Dialog>
    </Box>
  )
}

export default BalanceListItem

import React, { useRef, useState, useEffect } from "react"
import { Button, Dialog,
  DialogActions, DialogContent, Box, DialogTitle,
  TextField, FormControlLabel, Checkbox } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useStore } from "../../context/store"

function BalanceListItemDialog(props) {
  const [ payWithSwish, setPayWithSwish] = useState(false)
  const [ amount, setAmount ] = useState("")
  const { store, socket } = useStore()
  const [ showQRCode, setShowQRCode ] = useState(false)
  const [ qrCode, setQRCode ] = useState("")
  const [ alertText, setAlertText ] = useState("")
  const [ showDialogAlert, setShowDialogAlert ] = useState(false)
  const formRef = useRef()

  const handleSubmit = () => {
    if( formRef.current.reportValidity()) {
      if (amount > 0) {
        socket.once("payment_response", (payload) => {
          payload = JSON.parse(payload)
          if(payload["success"]) {
            if(payWithSwish) {
              setAlertText(payload["msg"])
              setQRCode(payload["qr_code"])
              setShowQRCode(true)
            }
            else {
              props.setAlertText(payload["msg"])
              props.setShowAlert(true)
              setTimeout(() => {
                props.setShowAlert(false)
              }, 6000)
              props.setRenderDialog(false)
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
      <Dialog
      className="create-group-modal"
      open={true}>
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
              <Button onClick={() => props.setRenderDialog(false)} color="secondary" >
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
              <form ref={formRef}>
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
          </Box>
          }
      </Dialog>
    </Box>
  )
}

export default BalanceListItemDialog

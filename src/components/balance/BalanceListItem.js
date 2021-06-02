import React, { useRef, useState } from "react"
import {ListItem, ListItemText, Button, Dialog,
  DialogActions, DialogContent, Box, DialogTitle,
  TextField, FormControlLabel, Checkbox } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import BalanceText from "./BalanceText"

function BalanceListItem(props) {
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [ payWithSwish, setPayWithSwish] = useState(false)
  const [amount, setAmount] = useState("")
  const formRef = useRef()

  const handleClick = (e) => {
    e.preventDefault(e)
    setShowAlert(false)
    setOpen(true)
    console.log("Make Swish API call to " + props.number)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if( formRef.current.reportValidity()) {
      if (amount <= 0) {
        setShowAlert(true)
        setAlertText("Amount has to be greater than 0.")
        return
      }
      setOpen(false)
    }
  }

  return (
    <Box>
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
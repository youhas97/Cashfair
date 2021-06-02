import React, { useRef, useState } from "react"
import {ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, Box, DialogTitle, TextField} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import BalanceText from "./BalanceText"

function BalanceListItem(props) {
  const [open, setOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
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
        setAlertText("Amount has to be greater than 0")
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
          <DialogTitle className="create-group-title">Payment to {props.name}</DialogTitle>
          {showAlert ? <Alert style={{
            margin: "auto",
            maxWidth: "250px"
          }}
          severity="error"
          >
            {alertText}
          </Alert> : undefined }
          <DialogContent className="create-group-modal-content">
          <TextField onChange={(e) => setAmount(e.target.value)}
            required autoComplete="nope" className="create-group-input" color="secondary" label="Amount"/>
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
    </Box>
  )
}

export default BalanceListItem
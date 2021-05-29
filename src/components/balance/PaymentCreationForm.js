import React from "react"

import { TextField, Box} from "@material-ui/core"
//import GroupCreationFormInput from "./GroupCreationFormInput"

function PaymentCreationForm(props) {

  const handleInputChange = (e) => {
    switch(e.target.name) {
      case "phone":
        props.setPhoneNum(e.target.value)
        break;
      case "nickname":
        props.setNickname(e.target.value)
        break;
      case "amount":
        props.setAmount(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <div>
        <Box display="flex" flexDirection="column">
          <TextField onChange={handleInputChange} label="Phone Number" name="phone" color="secondary" required type="number" />
          <TextField onChange={handleInputChange} label="Nickname" name="nickname" color="secondary" type="text" required />
          <TextField onChange={handleInputChange} label="Amount" name="amount" color="secondary" type="number" required />
        </Box>
    </div>
  )
}

export default PaymentCreationForm
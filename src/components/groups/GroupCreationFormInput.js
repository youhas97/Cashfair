import React, { useEffect, useState } from "react"

import { TextField, FormGroup, Box } from "@material-ui/core"
import { useGroupStore } from "../../context/groupStore"

function GroupCreationFormInput(props) {
  const { inputDict, actions, dispatch } = useGroupStore()
  const [phoneNum, setPhoneNum] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if(props.type !== "self") {
      console.log(props)
      dispatch({
        type: actions.SET_INPUT_DICT,
        value: {id: props.id, name: name, phoneNum: phoneNum}
      })
    }
  }, [phoneNum, name])

  const handleChangeName = (e) => {
    e.preventDefault(e)
    setName(e.target.value)
  }

  const handleChangeNum = (e) => {
    e.preventDefault(e)
    setPhoneNum(e.target.value)
  }

  if (props.type === "self") {
    return (
      <FormGroup row>
        <Box mr={2}>
          <TextField
            required margin="dense" defaultValue={props.name} autoComplete="nope"
            className="create-group-input" color="secondary" label="Name"
            InputProps={{
              readOnly: true,
            }}/>
        </Box>
        <Box mr={2}>
          <TextField
            required margin="dense" defaultValue={props.number} autoComplete="nope"
            className="create-group-input" color="secondary" label="Phone number" type="number"
            InputProps={{
              readOnly: true,
            }}/>
        </Box>
      </FormGroup>
    )
  } else return (
    <FormGroup row>
      <Box mr={2}>
        <TextField onChange={handleChangeName}
          required margin="dense" autoComplete="nope"
          className="create-group-input" color="secondary" label="Name"/>
      </Box>
      <Box mr={2}>
        <TextField onChange={handleChangeNum}
          required margin="dense" autoComplete="nope"
          className="create-group-input" color="secondary" label="Phone number" type="number"/>
      </Box>
    </FormGroup>
  )
}

export default GroupCreationFormInput
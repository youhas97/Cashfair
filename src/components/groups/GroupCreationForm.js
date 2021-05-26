import React, { useEffect, useState } from "react"
import { useGroupStore } from "../../context/groupStore"

import { TextField, IconButton, Box, Grid } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GroupCreationFormInput from "./GroupCreationFormInput"

function GroupCreationForm() {
  const { inputDict, actions, dispatch } = useGroupStore()

  const addInput = () => {
    dispatch({type: actions.ADD_INPUT})
  }

  const removeInput =() => {
    dispatch({type: actions.REMOVE_INPUT})
  }

  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  const childComponents = Object.values(inputDict).map(e => e.component)

  return (
    <div>
      <TextField required autoComplete="nope" className="create-group-input" color="secondary" label="Group Name"/>
      <h3 className="create-group-title">Members</h3>
      <Box component="span" mr={2}>
        <IconButton onClick={addInput} variant="outlined" color="secondary">
          <AddIcon />
        </IconButton>
      </Box>
      <Box component="span">
        <IconButton onClick={removeInput} variant="outlined" color="secondary">
          <RemoveIcon />
        </IconButton>
      </Box>
      <GroupCreationFormInput type="self" name="Johnny" number="0763123728"/>
      {childComponents}
    </div>
  )
}

export default GroupCreationForm
import React, { useEffect, useState } from "react"
import { useGroupStore } from "../../context/groupStore"

import { TextField, IconButton, Box, Grid } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GroupCreationFormInput from "./GroupCreationFormInput"

function GroupCreationForm() {
  const { groupData, actions, dispatch } = useGroupStore()

  const addInput = () => {
    dispatch({type: actions.ADD_INPUT})
  }

  const removeInput = () => {
    dispatch({type: actions.REMOVE_INPUT})
  }

  const handleTitleChange = (e) => {
    dispatch({type: actions.SET_GROUP_NAME, value: e.target.value})
  }

  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  const childComponents = Object.values(groupData.members).map(e => e.component)
  childComponents.splice(0, 1)

  return (
    <div>
      <TextField onChange={handleTitleChange}
        required autoComplete="nope" className="create-group-input" color="secondary" label="Group Name"/>
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
      <GroupCreationFormInput type="self" id={0} name="Johnny" phoneNum="0763123728" />
      {childComponents}
    </div>
  )
}

export default GroupCreationForm
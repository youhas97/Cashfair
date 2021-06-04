import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import { useGroupStore } from "../../context/groupStore"

import { Box, InputLabel, Select, MenuItem,
  FormControl, Checkbox, ListItemText,
  Chip, FormControlLabel, TextField } from "@material-ui/core"

function GroupPaymentForm() {
  const { store } = useStore()
  const { groups, actions, dispatch } = useGroupStore()
  const [ selectedGroup, setSelectedGroup ] = useState(groups[0])
  const [ selectedMembers, setSelectedMembers ] = useState([])
  const [ selectAllMembers, setSelectAllMembers ] = useState(false)
  const [ amount, setAmount ] = useState("")

  useEffect(() => {
    dispatch({type: actions.SET_AMOUNT, value: amount})
    dispatch({type: actions.SET_SELECTED_GROUP, value: selectedGroup})
    if(selectAllMembers)
      dispatch({type: actions.SET_SELECTED_MEMBERS, value: selectedGroup["members"]})
    else
      dispatch({type: actions.SET_SELECTED_MEMBERS, value: selectedMembers})
  }, [selectedGroup, selectedMembers, selectAllMembers, amount])

  const renderSelectedMembers = () => {
    let key = 0;
    if (selectAllMembers)
      return

    return (
      <Box display="flex" flexWrap="wrap">
        {selectedMembers.map((member) => (
          <Box mr={1} my={0.6} key={key++}>
            <Chip key={member["phone_num"]}
              label={member["nickname"] + (member["phone_num"] === store.userData.phoneNum ? " (you)" : "")} />
          </Box>
        ))}
      </Box>
    )
  }

  var groupMenuItems
  var memberMenuItems
  if (selectedGroup){
    groupMenuItems = groups.map(group => <MenuItem key={group["id"]} value={group}>{group["name"]}</MenuItem>)
    memberMenuItems = selectedGroup["members"].map(member =>
      <MenuItem key={selectedGroup["members"].indexOf(member)} value={member}>
        <Checkbox color="primary" checked={selectedMembers.indexOf(member) > -1} />
        <ListItemText primary={member["nickname"] + (member["phone_num"] === store.userData.phoneNum ? " (you)" : "")}/>
      </MenuItem>)
  }

  return (
    <div>
      <Box mb={5}>
        <h3 className="create-group-title">Which group is the payment for?</h3>
        <FormControl >
          <InputLabel id="select-group-label" color="secondary" >Group</InputLabel>
          <Select color="secondary" className="create-group-select-input" labelId="select-group-label" label="select-group"
            value={selectedGroup}
            onChange={(e) => {
              setSelectedGroup(e.target.value)
              setSelectedMembers([])}
            } >
              {groupMenuItems}
          </Select>
        </FormControl>
      </Box>
      {selectedGroup ?
      <Box>
        <h3 className="create-group-title">Select which members to split payment with</h3>
        <Box>
          <FormControlLabel control={
              <Checkbox checked={selectAllMembers} onChange={() => setSelectAllMembers(!selectAllMembers)} />
            }
            label="Select all members" />
        </Box>
        <FormControl>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <InputLabel id="select-members-label" color="secondary" >Members</InputLabel>
            <Select disabled={selectAllMembers} required={!selectAllMembers}
              color="secondary" className="create-group-select-input" autoWidth={true} labelId="select-members-label" label="select-members"
              value={selectedMembers} multiple onChange={(e) => setSelectedMembers(e.target.value)}
              renderValue={renderSelectedMembers}
              >
                {memberMenuItems}
            </Select>
          </Box>
          <Box mt={3}>
          <h3 className="create-group-title">Payment amount</h3>
          <TextField onChange={(e) => setAmount(e.target.value)} type="number"
            required autoComplete="nope" className="create-group-input" color="secondary" label="Amount"/>
          </Box>
        </FormControl>
      </Box> : undefined}
    </div>
  )
}

export default GroupPaymentForm
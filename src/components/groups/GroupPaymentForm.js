import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import { useGroupStore } from "../../context/groupStore"

import { Box, InputLabel, Select, MenuItem, FormControl, Checkbox, ListItemText, Chip } from "@material-ui/core"

function GroupPaymentForm() {
  const { store } = useStore()
  const { groups } = useGroupStore()
  const [ selectedGroup, setSelectedGroup ] = useState(groups[0])
  const [ selectedMembers, setSelectedMembers ] = useState([])

  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  const renderSelectedMembers = () => {
    let key = 0;
    return (
      <Box display="flex" flexWrap="wrap">
        {selectedMembers.map((member) => (
          <Box mr={1} my={0.6} key={key++}>
            <Chip key={member["phone_num"]} label={member["nickname"] === store.userData.nickname ? "You" : member["nickname"]} />
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
        <ListItemText primary={member["nickname"]}/>
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
        <FormControl>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
          <InputLabel id="select-members-label" color="secondary" >Members</InputLabel>
          <Select color="secondary" className="create-group-select-input" autoWidth={true} labelId="select-members-label" label="select-members"
            value={selectedMembers} multiple onChange={(e) => setSelectedMembers(e.target.value)}
            renderValue={renderSelectedMembers}
             >
              <MenuItem value={store.userData}>
                <Checkbox color="primary" checked={selectedMembers.indexOf(store.userData) > -1} />
                <ListItemText primary="You" />
              </MenuItem>
              {memberMenuItems}
          </Select>
          </Box>
        </FormControl>
      </Box> : undefined}
    </div>
  )
}

export default GroupPaymentForm
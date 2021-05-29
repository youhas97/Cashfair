import React, { useEffect, useState } from "react"
import { useGroupStore } from "../../context/groupStore"

import { Box, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core"

function GroupPaymentForm() {
  const [ selectedGroup, setSelectedGroup ] = useState("")
  const { groupData } = useGroupStore()

  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  const childComponents = Object.values(groupData.members).map(e => e.component)
  childComponents.splice(0, 1)

  return (
    <div>
      <Box mb={5}>
        <h3 className="create-group-title">Which group is the payment for?</h3>
        <FormControl >
          <InputLabel id="select-group-label" color="secondary" >Group</InputLabel>
          <Select color="secondary" className="create-group-select-input" labelId="select-group-label" label="select-group"
            value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} >
              <MenuItem value="10">Tesadn</MenuItem>
              <MenuItem value="20">Tedwadawn</MenuItem>
              <MenuItem value="30">Tesdan</MenuItem>
              <MenuItem value="40">Tesn</MenuItem>
              <MenuItem value="50">Tend</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectedGroup ?
      <Box>
        <h3 className="create-group-title">Select which members to split payment with</h3>
        <FormControl>
          <InputLabel id="select-members-label" color="secondary" >Members</InputLabel>
          <Select color="secondary" className="create-group-select-input" labelId="select-members-label" label="select-members"
            value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} >
              <MenuItem value="90">Tesadn</MenuItem>
              <MenuItem value="12830">Tedwadawn</MenuItem>
              <MenuItem value="13210">Tesdan</MenuItem>
              <MenuItem value="110">Tesn</MenuItem>
              <MenuItem value="13210">Tend</MenuItem>
          </Select>
        </FormControl>
      </Box> : undefined}
    </div>
  )
}

export default GroupPaymentForm
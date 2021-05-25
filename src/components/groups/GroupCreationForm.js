import React, { useEffect } from "react"

import { TextField } from "@material-ui/core"

function GroupCreationForm() {
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  return (
    <div>
      <TextField className="create-group-input" color="secondary" label="Group Name"/>
    </div>
  )
}

export default GroupCreationForm
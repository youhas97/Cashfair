import React from "react"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"

import { Button, withStyles } from '@material-ui/core';

function Groups() {
  return (
    <div className="main">
      <DashboardLeft />
      <Dashboard>
        <Button variant="contained" color="primary" >
          Create new group
        </Button>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Groups
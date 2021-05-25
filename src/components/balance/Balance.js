import React, { useEffect } from "react"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"

function Balance() {
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  return (
    <div className="main">
      <DashboardLeft />
      <Dashboard>
        <h1 style={{margin: "auto", color: "red", marginTop: "10vh"}}>TODO: Implement balance page</h1>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Balance
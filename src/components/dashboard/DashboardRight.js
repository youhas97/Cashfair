import React from "react"

import "../../styling/dashboard/DashboardRight.css"

function DashboardRight(props) {
  return (
    <div className="dashboard-right">
      {props.children}
    </div>
  )
}

export default DashboardRight

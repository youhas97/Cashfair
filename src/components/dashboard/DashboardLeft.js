import React from "react"

import "../../styling/dashboard/DashboardLeft.css"


function DashboardLeft(props) {
  return (
    <div className="dashboard-left">
      {props.children}
    </div>
  )
}

export default DashboardLeft

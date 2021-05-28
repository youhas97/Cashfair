import React from "react"

import "../../styling/dashboard/Dashboard.css"

function Dashboard(props) {
  return (
    <div className="dashboard">
      {props.children}
    </div>
  )
}

export default Dashboard

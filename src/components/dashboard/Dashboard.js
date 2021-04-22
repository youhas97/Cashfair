import React from "react"

import "../../styling/dashboard/Dashboard.css"

import OverviewCard from "./OverviewCard"
import CollapseableComponent from "../CollapsibleComponent"

function Dashboard() {
  const groupCards = {}

  return (
    <div className="dashboard">
      <CollapseableComponent
      item={{children: [<OverviewCard key={1} item={{value: -19, className: "self-balance-card"}} />],
             title: "Self",
            className: "self-balance-card-container"}}
      />
      <CollapseableComponent
        item={{
          children: [
            <OverviewCard key={1} item={{value: -100, className: "groups-card"}}/>,
            <OverviewCard key={2} item={{value: 150, className:"groups-card"}}/>,
            <OverviewCard key={3} item={{value: -69, className:"groups-card"}}/>
          ],
          title: "Groups",
          className: "groups-card-container"
        }}
      />
    </div>
  )
}

export default Dashboard

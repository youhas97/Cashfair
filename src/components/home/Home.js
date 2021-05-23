import React from "react"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "../dashboard/BalanceCard"

import CollapseableComponent from "../CollapsibleComponent"

function Home() {
  return (
    <div className="main">
      <DashboardLeft>
      </DashboardLeft>
      <Dashboard>
        <CollapseableComponent
          item={{children: [<BalanceCard key={1} item={{value: -19, className: "self-balance-card"}} />],
                title: "Self",
                className: "self-balance-card-container"}}
          />
        <CollapseableComponent
          item={{
            children: [
              <BalanceCard key={1} item={{value: -100, className: "groups-card"}}/>,
              <BalanceCard key={2} item={{value: 150, className:"groups-card"}}/>,
              <BalanceCard key={3} item={{value: -69, className:"groups-card"}}/>
            ],
            title: "Groups",
            className: "groups-card-container"
          }}
        />
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Home

import React from "react"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "../balance/BalanceCard"

import CollapseableComponent from "../CollapsibleComponent"

function Home() {
  return (
    <div className="main">
      <DashboardLeft />
      <Dashboard>
        <CollapseableComponent title="Self"className="self-balance-card-container">
          <BalanceCard key={1} value={-19} className="self-balance-card" />
        </CollapseableComponent>
        <CollapseableComponent title="Groups" className="groups-card-container">
          <BalanceCard key={1} value={-100} className="groups-card"/>
          <BalanceCard key={2} value={150} className="groups-card"/>
          <BalanceCard key={3} value={-69} className="groups-card"/>
        </CollapseableComponent>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Home

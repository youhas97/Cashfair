import React, { useEffect } from "react"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "./BalanceCard"
import BalanceList from "./BalanceList"

function Balance() {
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  return (
    <div className="main">
      <DashboardLeft>
        <BalanceCard key={1} title="Your Balance" value={-19} className="independent-balance-card" />
      </DashboardLeft>
      <Dashboard>
        <BalanceList title="Your balance"
        members={{
          "Johnny": -160,
          "Bertil": 60,
          "Tim": 85,
          "Calle": 65,
          "Mary": -43,
          "Sven-Göran": -26
        }}/>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Balance
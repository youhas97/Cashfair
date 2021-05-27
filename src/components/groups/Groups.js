import React, { useEffect } from "react"

import { List, ListItem, ListItemText, Divider } from "@material-ui/core"

import { useGroupStore, GroupStoreProvider } from "../../context/groupStore"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import GroupBalanceList from "./GroupBalanceList"

import BalanceText from "../balance/BalanceText"
import BalanceCard from "../balance/BalanceCard"
import GroupCreation from "./GroupCreation"
import CollapseableComponent from "../CollapsibleComponent"

function Groups() {
  useEffect(() => {
    // TODO: Fetch Groups data with API
  }, [])

  return (
    <div className="main">
      <GroupStoreProvider>
        <DashboardLeft>
          <BalanceCard key={1} title="Your Balance" value={-19} className="independent-balance-card" />
        </DashboardLeft>
        <Dashboard>
          <GroupBalanceList groupName="Group 1" members={{"Johnny": -160, "Bertil": 60}} />
          <GroupBalanceList groupName="Group 2" members={{"Tim": 85, "Calle": 65}} />
          <GroupBalanceList groupName="Group 3" members={{"Mary": -43, "Sven-Göran": -26}} />
        </Dashboard>
        <DashboardRight>
            <GroupCreation />
        </DashboardRight>
      </GroupStoreProvider>
    </div>
  )
}

export default Groups
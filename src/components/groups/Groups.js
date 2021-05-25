import React, { useEffect } from "react"

import { List, ListItem, ListItemText } from "@material-ui/core"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceText from "../balance/BalanceText"
import BalanceCard from "../balance/BalanceCard"

import CollapseableComponent from "../CollapsibleComponent"

function Groups() {
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  return (
    <div className="main">
      <DashboardLeft />
      <Dashboard>
       <CollapseableComponent title="Group 1" totalBalance={20}>
        <List>
          <ListItem button>
            <ListItemText primary="Johnny"></ListItemText>
            <BalanceText value={-50}></BalanceText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bertil"></ListItemText>
            <BalanceText value={70}></BalanceText>
          </ListItem>
        </List>
       </CollapseableComponent>
       <CollapseableComponent title="Group 2" totalBalance={-100}>
        <List>
          <ListItem button>
            <ListItemText primary="Tim"></ListItemText>
            <BalanceText value={-50}></BalanceText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Calle"></ListItemText>
            <BalanceText value={-50}></BalanceText>
          </ListItem>
        </List>
       </CollapseableComponent>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Groups
import React, { useEffect } from "react"

import { List, ListItem, ListItemText, Divider } from "@material-ui/core"

import { useGroupStore, GroupStoreProvider } from "../../context/groupStore"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceText from "../balance/BalanceText"
import BalanceCard from "../balance/BalanceCard"
import GroupCreation from "./GroupCreation"
import CollapseableComponent from "../CollapsibleComponent"

function Groups() {
  useEffect(() => {
    // Fetch Groups data with API
  }, [])

  return (
    <div className="main">
      <DashboardLeft>
        <BalanceCard key={1} title="Your Balance" value={-19} className="independent-balance-card" />
      </DashboardLeft>
      <Dashboard>
       <CollapseableComponent title="Group 1" totalBalance={-100}>
        <List>
          <ListItem>
            <ListItemText primary="You"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Johnny"></ListItemText>
            <BalanceText value={-160}></BalanceText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bertil"></ListItemText>
            <BalanceText value={60}></BalanceText>
          </ListItem>
        </List>
       </CollapseableComponent>
       <CollapseableComponent title="Group 2" totalBalance={150}>
        <List>
          <ListItem>
            <ListItemText primary="You"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Tim"></ListItemText>
            <BalanceText value={85}></BalanceText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Calle"></ListItemText>
            <BalanceText value={65}></BalanceText>
          </ListItem>
        </List>
       </CollapseableComponent>
       <CollapseableComponent title="Group 3" totalBalance={-69}>
        <List>
          <ListItem>
            <ListItemText primary="You"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Mary"></ListItemText>
            <BalanceText value={-43}></BalanceText>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sven"></ListItemText>
            <BalanceText value={-26}></BalanceText>
          </ListItem>
        </List>
       </CollapseableComponent>
      </Dashboard>
      <DashboardRight>
        <GroupStoreProvider>
          <GroupCreation />
        </GroupStoreProvider>
      </DashboardRight>
    </div>
  )
}

export default Groups
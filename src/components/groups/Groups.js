import React, { useEffect, useState } from "react"

import { Box } from "@material-ui/core"

import { GroupStoreProvider } from "../../context/groupStore"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceList from "../balance/BalanceList"

import BalanceCard from "../balance/BalanceCard"
import GroupCreation from "./GroupCreation"
import GroupPayment from "./GroupPayment"
import { useStore } from "../../context/store"

function Groups() {
  const { store, socket } = useStore()
  const [groups, setGroups] = useState([])

  useEffect(() => {
    socket.on("groups_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp && resp["success"]) {
        setGroups(resp.groups)
      }
    })
    socket.emit("get_groups", JSON.stringify(store.userData.phoneNum))
    return () => {
      socket.off("groups_update")
    }
  }, [])

  //let key = 0;
  const groupLists = groups.map(group => {
    return <BalanceList key={group.id} type="groupList" title={group.name} members={group.members} />
  })
  return (
    <div className="main">
      <GroupStoreProvider>
        <DashboardLeft>
          <BalanceCard key={1} title="Your Balance" className="independent-balance-card"
            value={groups.map(
                group => group.members.map(member => member["balance"]).reduce((a,b) => a+b, 0)
              ).reduce((a,b) => a+b, 0) }/>
        </DashboardLeft>
        <Dashboard>
          {groupLists}
        </Dashboard>
        <DashboardRight>
          <Box mt={5}>
            <GroupCreation />
            <GroupPayment />
          </Box>
        </DashboardRight>
      </GroupStoreProvider>
    </div>
  )
}

export default Groups
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
  const [groups, setGroups] = useState({})
  const [members, setMembers] = useState({})

  useEffect(() => {
    let groups_update = socket.on("groups_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        //console.log(resp.groups)
        setGroups(JSON.parse(resp.groups))
    })
    let balance_update = socket.on("balance_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        setMembers(resp.associates)
    })
    socket.emit("get_groups", JSON.stringify(store.userData.phoneNum))
    socket.emit("get_balance", store.userData.phoneNum)
    return () => {
      socket.off("groups_update", groups_update)
      socket.off("balance_update", balance_update)
    }
  }, [])

  let key = 0;
  const groupLists = Object.keys(groups).map(groupName => {
    return <BalanceList key={key++} type="groupList" title={groupName} members={groups[groupName]} />
  })
  return (
    <div className="main">
      <GroupStoreProvider>
        <DashboardLeft>
          <BalanceCard key={1} title="Your Balance" className="independent-balance-card"
            value={Object.values(members).map((member) => member["balance"]).reduce(((a,b) => a+b), 0)}/>
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
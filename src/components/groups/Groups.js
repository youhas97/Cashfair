import React, { useEffect } from "react"

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

  useEffect(() => {
    let groups_update = socket.on("groups_update", (payload) => {
      console.log("GROUPS: " + payload)
    })
    socket.emit("get_groups", JSON.stringify(store.userData.phoneNum))
    return () => {
      socket.off("groups_update", groups_update)
    }
  }, [])

  return (
    <div className="main">
      <GroupStoreProvider>
        <DashboardLeft>
          <BalanceCard key={1} title="Your Balance" value={-19} className="independent-balance-card" />
        </DashboardLeft>
        <Dashboard>
          <BalanceList type="groupList" title="Group 1" members={{"Johnny": -160, "Bertil": 60}} />
          <BalanceList type="groupList" title="Group 2" members={{"Tim": 85, "Calle": 65}} />
          <BalanceList type="groupList" title="Group 3" members={{"Mary": -43, "Sven-Göran": -26}} />
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
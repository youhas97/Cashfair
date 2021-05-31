import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "../balance/BalanceCard"

import CollapseableComponent from "../CollapsibleComponent"

function Home() {
  const { store, socket } = useStore()
  const [groups, setGroups] = useState([])
  const [associations, setAssociations] = useState([])

  // TODO: ERROR - socket.on is not created first time component is mounted
  useEffect(() => {
    socket.on("groups_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp && resp["success"])
        console.log("GRP: " + JSON.stringify(resp.groups))
        setGroups(resp.groups)
    })
    socket.on("balance_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        setAssociations(resp.associates)
    })
    socket.emit("get_groups", JSON.stringify(store.userData.phoneNum))
    socket.emit("get_balance", store.userData.phoneNum)
    return () => {
      socket.off("groups_update")
      socket.off("balance_update")
    }
  }, [])


  let key = 0;
  const groupCards = groups.map(group => {
    return <BalanceCard key={key++} title={group["name"]} className="groups-card"
      value={groups.map(group => group.members.map(member => member["balance"]).reduce((a,b) => a+b, 0)
      ).reduce((a,b) => a+b, 0)} />
  })

  return (
    <div className="main">
      <DashboardLeft />
      <Dashboard>
        <CollapseableComponent title="Self"className="self-balance-card-container">
          <BalanceCard key={1} title="Your Balance" className="self-balance-card"
            value={associations.map((asc) => asc["balance"]).reduce(((a,b) => a+b), 0)} />
        </CollapseableComponent>
        <CollapseableComponent title="Groups" className="groups-card-container">
          {groupCards}
        </CollapseableComponent>
      </Dashboard>
      <DashboardRight />
    </div>
  )
}

export default Home

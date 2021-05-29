import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "./BalanceCard"
import BalanceList from "./BalanceList"
import PaymentCreation from "./PaymentCreation"

import { Box } from "@material-ui/core"

function Balance() {
  const { store, socket } = useStore()
  const [members, setMembers] = useState({})

  useEffect(() => {
    // Fetch Balance data with API
    let balance_update = socket.on("balance_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        setMembers(resp.associates)
    })
    socket.emit("get_balance", store.userData.phoneNum)
    return () => {
      socket.off("balance_update", balance_update)
    }
  }, [])

  return (
    <div className="main">
      <DashboardLeft>
        <BalanceCard key={1} title="Your Balance" value={-19} className="independent-balance-card" />
      </DashboardLeft>
      <Dashboard>
        <BalanceList title="Your balance"
        members={members}/>
      </Dashboard>
      <DashboardRight>
        <Box mt={5}>
          <PaymentCreation />
        </Box>
      </DashboardRight>
    </div>
  )
}

export default Balance
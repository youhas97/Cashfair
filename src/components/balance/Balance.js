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
  const [associations, setAssociations] = useState([])

  useEffect(() => {
    // Fetch Balance data with API
    socket.on("balance_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        setAssociations(resp.associates)
    })
    socket.emit("get_balance", store.userData.phoneNum)
    return () => {
      socket.off("balance_update")
    }
  }, [])

  return (
    <div className="main">
      <DashboardLeft>
        <BalanceCard key={1} title="Your Balance" className="independent-balance-card"
          value={Object.values(associations).map((asc) => asc["balance"]).reduce(((a,b) => a+b), 0)} />
      </DashboardLeft>
      <Dashboard>
        <BalanceList title="Balances"
        members={associations}/>
      </Dashboard>
      <DashboardRight>
        <Box mt={5}>
          <Box>
            <PaymentCreation />
          </Box>
          <Box>
            <PaymentCreation type="loan"/>
          </Box>
        </Box>
      </DashboardRight>
    </div>
  )
}

export default Balance
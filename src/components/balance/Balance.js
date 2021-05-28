import React, { useEffect, useState } from "react"
import { useStore } from "../../context/store"

import Dashboard from "../dashboard/Dashboard"
import DashboardLeft from "../dashboard/DashboardLeft"
import DashboardRight from "../dashboard/DashboardRight"
import BalanceCard from "./BalanceCard"
import BalanceList from "./BalanceList"

import { Button } from "@material-ui/core"

function Balance() {
  const { store, socket } = useStore()
  const [members, setMembers] = useState({})

  useEffect(() => {
    // Fetch Balance data with API
    socket.on("balance_update", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        setMembers(resp.affiliates)
    })
    socket.emit("get_balance", store.phoneNum)
  }, [])

  const handleOpen = () => {
    socket.once("register_payment_response", (resp) => {
      resp = JSON.parse(resp)
      if(resp["success"])
        socket.emit("get_balance", store.phoneNum)
    })
    // TODO: Emit proper values from a dialog option.
    socket.emit("register_payment", store.phoneNum, "0736267292", "testdude", "100")
  }

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
        {/* TODO: Add proper dialog to register new payment */}
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Register new payment
        </Button>
      </DashboardRight>
    </div>
  )
}

export default Balance
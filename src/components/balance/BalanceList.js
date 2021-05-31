import React, { useEffect, useState } from "react"

import { List } from "@material-ui/core"

import CollapseableComponent from "../CollapsibleComponent"
import BalanceListItem from "./BalanceListItem"

function BalanceList(props) {
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    if (Object.keys(props.members).length) {
      const balances = props.members.map((member) => member["balance"])
      setTotalBalance(balances.reduce(((a,b) => a+b), 0))
    }
  }, [props.members])

  var listItems
  if (props.members)  {
    var key = 0;
    listItems = props.members.map(member => <BalanceListItem key={key++} clickable={true} name={member["nickname"]} value={member["balance"]} />)
  }

  return (
    <CollapseableComponent title={props.title} totalBalance={totalBalance ? totalBalance : undefined}>
      <List>
        {props.type==="groupList" ? <BalanceListItem name="You" /> : undefined}
        {listItems}
      </List>
    </CollapseableComponent>
  )
}

export default BalanceList
import React, { useEffect, useState } from "react"

import { List } from "@material-ui/core"

import CollapseableComponent from "../CollapsibleComponent"
import GroupBalanceListItem from "./GroupBalanceListItem"

function GroupBalanceList(props) {
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    setTotalBalance(Object.values(props.members).reduce((a, b) => a+b, 0))
  }, [props.members])

  const listItems = Object.keys(props.members).map(member => {
    return <GroupBalanceListItem name={member} value={props.members[member]} />
    }
  )

  return (
    <CollapseableComponent title={props.groupName} totalBalance={totalBalance}>
      <List>
        <GroupBalanceListItem name="You" />
        {listItems}
      </List>
    </CollapseableComponent>
  )
}

export default GroupBalanceList
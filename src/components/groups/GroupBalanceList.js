import React, { useEffect, useState } from "react"

import { List } from "@material-ui/core"

import CollapseableComponent from "../CollapsibleComponent"
import GroupBalanceListItem from "./GroupBalanceListItem"

function GroupBalanceList(props) {
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    setTotalBalance(Object.values(props.members).reduce((a, b) => a+b, 0))
  }, [props.members])

  const listItems = Object.keys(props.members).map(member => <GroupBalanceListItem clickable={true} name={member} value={props.members[member]} />)
  listItems.unshift(<GroupBalanceListItem name="You" />)

  return (
    <CollapseableComponent title={props.groupName} totalBalance={totalBalance}>
      <List>
        {listItems}
      </List>
    </CollapseableComponent>
  )
}

export default GroupBalanceList
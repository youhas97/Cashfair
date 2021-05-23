import React from "react"
import { useDispatch, useSelector } from "react-redux"

import "../../styling/dashboard/BalanceCard.css"

function BalanceCard(props) {
  return (
    <div
      className={"overview-card " + props.item.className}
      style={{borderColor: props.item.value >= 0 ? "#32BB64" : "orange"}}
      >
        <h1>Your balance</h1>
        <h1
          className={props.item.value >= 0 ? "positive-balance":"negative-balance"}
          >
            {props.item.value}kr
        </h1>
    </div>
  )
}

export default BalanceCard

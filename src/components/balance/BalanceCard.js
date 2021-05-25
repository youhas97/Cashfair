import React from "react"

import "../../styling/balance/BalanceCard.css"

function BalanceCard(props) {
  return (
    <div
      className={"overview-card " + props.className}
      style={{borderColor: props.value >= 0 ? "#388e3c" : "#f57c00"}}
      >
        <h1>Your balance</h1>
        <h1
          className={props.value >= 0 ? "positive-balance":"negative-balance"}
          >
            {props.value}kr
        </h1>
    </div>
  )
}

export default BalanceCard

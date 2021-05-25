import React from "react"

import "../../styling/balance/BalanceCard.css"

function BalanceCard(props) {
  return (
    <div
      className={"balance-card " + props.className}
      style={{borderColor: props.value >= 0 ? "#388e3c" : "#f57c00"}}
      >
        <h1 className="balance-card-text">{props.title}</h1>
        <h1
          className={"balance-card-text " + (props.value >= 0 ? "positive-balance":"negative-balance")}
          >
            {props.value}kr
        </h1>
    </div>
  )
}

export default BalanceCard

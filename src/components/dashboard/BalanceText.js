import React from "react"

import "../../styling/dashboard/BalanceCard.css"

function BalanceText(props) {
  return (
    <l style={{color: props.value >= 0 ? "#388e3c" : "#f57c00"}}>
      {props.value}kr
    </l>
  )
}

export default BalanceText

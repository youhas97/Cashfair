import React from "react"

import "../../styling/balance/BalanceCard.css"

function BalanceText(props) {
  return (
    <label style={{color: props.value >= 0 || isNaN(props.value) ? "#388e3c" : "#f57c00"}}>
      {isNaN(props.value) ? props.value : props.value + "kr"}
    </label>
  )
}

export default BalanceText

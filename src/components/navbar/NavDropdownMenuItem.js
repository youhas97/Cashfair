import React from "react"
import "../../styling/navbar/NavDropdownMenu.css"
import { useStore } from "../../context/store"
import { dropDownMenuItems } from "../../data/buttonData"

function NavDropdownMenuItem(props) {

  const { actions, dispatch, socket } = useStore()

  const handleClick = () => {
    console.log("LOG OUT")
    switch(props.text) {
      case dropDownMenuItems.LOG_OUT:
          socket.removeAllListeners()
        socket.disconnect()
        dispatch({type: actions.SET_TOKEN, value: undefined})
    }
  }

  return (
    <div className="nav-menu-item" onClick={handleClick}>
      {props.text}
    </div>
  )
}

export default NavDropdownMenuItem;
import React, {Component} from "react";

import "../../styling/navbar/Navbar.css"
import NavButton from "./NavButton"

import buttonData from "../data/buttonData"

class Navbar extends Component {
  constructor() {
      super()
      this.state = {
          buttons: localStorage.btnData ? JSON.parse(localStorage.btnData) : buttonData,
          activeButtonId: 1
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id) {
    this.setState(prevState => {
      const updatedButtons = prevState.buttons.map(btn => {
        btn.active = (btn.id === id) ? true : false;
        return btn;
      })
      localStorage.btnData = JSON.stringify(updatedButtons)
      return {
        buttons: updatedButtons,
        activeButtonId: id
      }
    })
  }

  render() {
    const navButtons = this.state.buttons.map(btn =>
      <NavButton key={btn.id} item={btn} handleChange={this.handleChange}/>)

    return (
      <nav className="Navbar">
        {navButtons}
      </nav>
    )
  }
}

export default Navbar

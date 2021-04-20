import React, { Component } from "react";
import { Collapse } from "@material-ui/core";

import "../styling/CollapsibleComponent.css"
import OverviewCard from "./dashboard/OverviewCard";

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState(prevState => {
      return {
        show: !prevState.show
      }
    })
  }

  render() {
    return(
      <div className="collapsible-component-container">
        <div className="collapse-div-bar"  onClick={this.handleChange}>
            <label className="collapse-bar-title" >{this.props.item.title}</label>
            <a className="collapse-button">{this.state.show ? "+" : "-"}</a>
        </div>
        <Collapse in={this.state.show}>
          <div className={this.props.item.className}>
            {this.props.item.children}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default CollapsibleComponent
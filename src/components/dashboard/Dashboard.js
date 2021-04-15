import React, { Component } from "react";

import "../../styling/dashboard/Dashboard.css"

import OverviewCard from "./OverviewCard"
import CollapseableComponent from "../CollapsibleComponent"

class Dashboard extends Component {
  constructor() {
      super()
      this.state = {
        value:-100
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
  }

  render() {

    return (
      <div className="dashboard" onClick={this.handleChange}>
        <CollapseableComponent
        item={{children: [<OverviewCard key={1} item={{value: this.state.value}}/>],
               title: "Self"}}
        />
        <CollapseableComponent
          item={{children: [<OverviewCard key={1} item={{value: this.state.value}}/>, <OverviewCard key={2} item={{value: 150}}/>],
               title: "Groups"}}
        />
      </div>
    )
  }
}

export default Dashboard

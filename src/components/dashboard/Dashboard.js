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
    const groupCards = {}

    return (
      <div className="dashboard" onClick={this.handleChange}>
        <CollapseableComponent
        item={{children: [<OverviewCard key={1} item={{value: this.state.value, className: "self-balance-card"}} />],
               title: "Self"}}
        />
        <CollapseableComponent
          item={{
            children: [
              <OverviewCard key={1} item={{value: this.state.value, className: "groups-card"}}/>, 
              <OverviewCard key={2} item={{value: 150, className:"groups-card"}}/>,
              <OverviewCard key={3} item={{value: -69, className:"groups-card"}}/>
            ],
            title: "Groups",
            className: "groups-card-container"
          }}
        />
      </div>
    )
  }
}

export default Dashboard

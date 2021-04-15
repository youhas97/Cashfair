import React, { Component } from "react";
import { Collapse } from "@material-ui/core";

import "../styling/CollapsibleComponent.css"
import OverviewCard from "./dashboard/OverviewCard";

class CollapsibleComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.collapseBar = this.collapseBar.bind(this)
  }

  handleChange(event) {
    //this.collapseBar(event)

    this.setState(prevState => {
      return {
        isCollapsed: !prevState.isCollapsed
      }
    })
  }

  collapseBar(event) {
    let target = undefined
    switch(event.target.className) {
      case "collapse-button":
      case "collapse-bar-title":
        target = event.target.parentNode.parentNode;
        break
      default:
        target = event.target.parentNode;
    }
    console.log(target)
    let collapsibleElement = target.querySelector(".visible-component")

    if(collapsibleElement) {
      setTimeout(() => {
        console.log(collapsibleElement)
        collapsibleElement.style={height:0}
      }, 500)
    }
  }

  render() {
    return(
      <div className="collapsible-component-container">
        <div className="collapse-div-bar"  onClick={this.handleChange}>
            <label className="collapse-bar-title" >{this.props.item.title}</label>
            <a className="collapse-button">{this.state.isCollapsed ? "+" : "-"}</a>
        </div>
        <Collapse in={!this.state.isCollapsed}>
          {this.props.item.children}
        </Collapse>
      </div>
    )
  }
}

export default CollapsibleComponent
import React from "react"

import "../styling/Main.css"

import Dashboard from "./dashboard/Dashboard"
import DashboardLeft from "./dashboard/DashboardLeft"
import DashboardRight from "./dashboard/DashboardRight"

function Main() {
  function handleClick(e) {
    e.preventDefault();
    alert("hello world");
  }

  return (
    <main className="Main">
      <DashboardLeft />
      <Dashboard />
      <DashboardRight />
    </main>
  )
}

export default Main
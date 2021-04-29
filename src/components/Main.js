import React, { useEffect } from "react"

import { useLocation, Route, Switch, NoMatch } from 'react-router-dom'

import "../styling/Main.css"

import Dashboard from "./dashboard/Dashboard"
import DashboardLeft from "./dashboard/DashboardLeft"
import DashboardRight from "./dashboard/DashboardRight"

function Main() {
  let location = useLocation()
  useEffect(() => {
    //Backend API calls maybe
    console.log(location.pathname)
  }, [location])

  return (
    <main className="Main">
      <Switch>
        <Route exact path="/">
          <DashboardLeft />
          <Dashboard />
          <DashboardRight />
        </Route>
        <Route exact path="/balance">
          <h1 style={{margin: "auto", color: "red", marginTop: "10vh"}}>TODO: Implement balance page</h1>
        </Route>
        <Route exact path="/groups">
          <h1 style={{margin: "auto", color: "red", marginTop: "10vh"}}>TODO: Implement groups page</h1>
        </Route>
      </Switch>
    </main>
  )
}

export default Main
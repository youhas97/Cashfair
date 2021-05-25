import React, { useEffect } from "react"

import { useLocation, Route, Switch, NoMatch } from 'react-router-dom'

import "../styling/Main.css"

import Home from "./home/Home"
import Groups from "./groups/Groups"
import Balance from "./balance/Balance"

import CollapseableComponent from "./CollapsibleComponent"

function Main() {
  let location = useLocation()
  useEffect(() => {
    //Backend API calls maybe
    console.log(location.pathname)
  }, [location])

  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/balance">
          <Balance />
        </Route>
        <Route exact path="/groups">
          <Groups />
        </Route>
      </Switch>
    </main>
  )
}

export default Main
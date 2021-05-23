import React, { useEffect } from "react"

import { useLocation, Route, Switch, NoMatch } from 'react-router-dom'

import "../styling/Main.css"

import Home from "./home/Home"
import Groups from "./groups/Groups"

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
          <h1 style={{margin: "auto", color: "red", marginTop: "10vh"}}>TODO: Implement balance page</h1>
        </Route>
        <Route exact path="/groups">
          <Groups />
        </Route>
      </Switch>
    </main>
  )
}

export default Main
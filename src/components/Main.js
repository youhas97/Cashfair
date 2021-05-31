import React from "react"
import { GroupStoreProvider } from "../context/groupStore"
import { Route, Switch, Redirect } from 'react-router-dom'

import "../styling/Main.css"

import Home from "./home/Home"
import Groups from "./groups/Groups"
import Balance from "./balance/Balance"

function Main() {
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
          <GroupStoreProvider>
            <Groups />
          </GroupStoreProvider>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  )
}

export default Main
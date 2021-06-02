import React, { useState, useEffect } from "react"
import { Route, Switch, Redirect } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { useStore } from '../../context/store'

import "../../styling/login/Login.css"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

function Login() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [isErrorAlert, setIsErrorAlert] = useState(false)
  const { store, actions, dispatch } = useStore()

  useEffect(() => {
    setShowAlert(store.successfulRegistration)
    /*
    Only want to start timeout if component is actually rendered,
    since useEffect is called once when component is mounted it will
    create a timeout when page is loaded for the first time. This if-statement
    is to counteract that.
    */
    if (store.successfulRegistration) {
      // Auto-close modal after 10s.
      setAlertText("Registration was successful! — You can now log in.")
      setIsErrorAlert(false)
      setTimeout(() => {
        dispatch({type: actions.SET_SUC_REG, value: false})
      }, 6000)
    }
  }, [store.successfulRegistration])

  return (
    <main className="login-main">
      <Switch>
        <Route exact path="/login">
        {showAlert ?
          <Alert variant="filled" severity={isErrorAlert ? "error" : "success"} className="alert"
          onClose={() => {
            dispatch({type: actions.SET_SUC_REG, value: false})
          }}>
            {alertText}
          </Alert> : undefined}
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </main>
  )
}

export default Login
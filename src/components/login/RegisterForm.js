import React, { useState, useEffect, useRef} from "react"
import { useStore } from "../../context/store"
import { Redirect, Link } from 'react-router-dom'
import { Alert } from "@material-ui/lab"
import { Button, TextField, Box } from "@material-ui/core"

function RegisterForm() {
  const [nickname, setNickName] = useState("")
  const [phoneNumber, updatePhoneNumber] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")
  const [successfulRegistration, setSuccessfulRegistration] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState(false)
  const formRef = useRef()
  const { actions, dispatch, url } = useStore()

  function submitForm(e) {
    e.preventDefault(e)
    if (formRef.current.reportValidity()) {
      // TODO: Check validity of phoneNumber

      if(password !== repeatPassword) {
        setShowAlert(true)
        setAlertText("Passwords don't match.")
        return
      }

      /* Send register request */
      let req = new XMLHttpRequest()
      req.open("POST", url + "/register")
      req.setRequestHeader("Content-Type", "application/json; charset=utf-8")
      req.responseType = 'json'
      req.send(JSON.stringify({"phoneNum": phoneNumber, "password": password, "nickname": nickname}))
      req.onload = () => {
        console.log("RESPONSE: " + JSON.stringify(req.response))
        if(req.status === 200 && req.response["success"]) {
          setSuccessfulRegistration(true)
        } else {
          setShowAlert(true)
          setAlertText(req.response["msg"])
        }
      }
    }
  }


  useEffect(() => {
    dispatch({type: actions.SET_SUC_REG, value: successfulRegistration})
  }, [successfulRegistration])

  return (
    <div className="content-div">
      <div className="login-form">
        <h1>Register Account</h1>
        {showAlert ? <Alert style={{
          margin: "auto",
          maxWidth: "20em"
        }}
        severity="error"
        >
          {alertText}
        </Alert> : undefined }
        <form ref={formRef}>
        <Box my={2}>
          <TextField
            autoComplete="nope"
            margin="dense"
            type="text"
            placeholder="Nickname"
            onChange={(e) => setNickName(e.target.value)}
            required/>
        </Box>
        <Box mb={2}>
          <TextField
            autoComplete="nope"
            margin="dense"
            type="number"
            placeholder="Phone number"
            onChange={(e) => updatePhoneNumber(e.target.value)}
            required/>
        </Box>
        <Box mb={2}>
          <TextField
            autoComplete="nope"
            margin="dense"
            type="password"
            placeholder="Password"
            onChange={(e) => updatePassword(e.target.value)}
            required/>
        </Box>
        <Box mb={5}>
          <TextField
            autoComplete="nope"
            margin="dense"
            type="password"
            onChange={(e) => updateRepeatPassword(e.target.value)}
            placeholder="Repeat password"
            required/>
        </Box>
        <Box mb={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={submitForm}>
              Register
          </Button>
        </Box>
        </form>
      </div>
      <div>
        <Link replace to={"/login"}
          className="register-btn-text">
              Already have an account? Sign in!
        </Link>
      </div>
      {successfulRegistration ? <Redirect from="/register" to="/login" /> : undefined}
    </div>
  )
}

export default RegisterForm
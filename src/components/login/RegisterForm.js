import React, { Component } from "react";

import "../../styling/login/RegisterForm.css"

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      phoneNumber: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault(e)
  }

  render() {
    return (
      <div className="LoginForm">
      <h1>Register Account</h1>
      <form>
        <input
        className="formInput"
        type="number"
        placeholder="Phone number"
        required/>
        <input
        className="formInput"
        type="password"
        placeholder="Password"
        required/>
        <input
        className="formInput"
        type="password"
        placeholder="Repeat password"
        required/>
        <input
        className="formBtn"
        type="submit"
        onClick={this.submitForm}
        value="Register"/>
      </form>
    </div>
    )
  }
}

export default RegisterForm
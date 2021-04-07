import React, { Component } from "react";

import "../../styling/login/LoginForm.css"

class LoginForm extends Component {
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
        <h1>Login</h1>
        <label>
          {this.state.phoneNumber} {this.state.password}
        </label>
        <form>
          <input 
            className="formInput"
            name="phoneNumber"
            onChange={this.handleChange} 
            type="number" 
            placeholder="Phone number" 
            required/>
          <input 
            className="formInput" 
            name="password"
            onChange={this.handleChange} 
            type="password" 
            placeholder="Password" 
            required/>
          <input 
            className="formBtn" 
            type="submit"
            onClick={this.submitForm} 
            value="Sign in"/>
        </form>
      </div>
    )
  }
}

export default LoginForm
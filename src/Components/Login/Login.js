import React, { Component } from 'react';
import axios from 'axios';
import './Login.css'
axios.defaults.withCredentials = true;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {

  }

  handleSetUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }
  loginUser = () => {
    const { username, password } = this.state;
    const userObject = { username, password};
    console.log(userObject);
    axios.post('http://localhost:3030/login', userObject)
      .then((data) => {
        console.log(data);
        if (data.data.message === "Login Successful") {
          document.getElementById('warningtag').style.display = "none";
          window.location = '/todo'
        } else {
          console.log('warning: ', data.data.message);
          document.getElementById('warningtag').style.display = "block";
        }
      })
      .catch((err) => {
        throw err;
      })

  }
  render() {
    const { username, password } = this.state;
    return(
      <div>
        <div>
          <label htmlFor="name"><b>Enter your userame:</b></label>
          <input maxLength="30" type="name" id="name" value={username} onChange={this.handleSetUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd"><b>Enter your Password:</b></label>
          <input maxLength="50" type="password" id="pwd" value={password} onChange={this.handleSetPassword} />
        </div>
        <button type="submit" onClick={this.loginUser}>Submit</button>
        <p className="warning" id="warningtag"> Your username and/or password is incorrect</p>
        <a href='/createuser'><p  href='/createuser'> Don't have an Account? Create One </p></a>
      </div>
    );
  }
}
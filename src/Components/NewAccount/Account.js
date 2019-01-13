import React from 'react';
import axios from 'axios';
import './Account.css'

export default class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  handleSetUsername = (event) => {
    this.setState({ username: event.target.value });
  }
  handleSetPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  createUser = () => {
    const {username, password } = this.state;
    const userObject = { username, password };
    axios.post('http://localhost:3030/createuser', userObject)
      .then(() => {

      })
      .catch((err) => {
        throw err;
      }) 
  }

  render() {
    return (
      <div className="page-margins">
        <h1>Create New Account</h1>
        <div>
          <label htmlFor="name"><b>Enter a userame:</b></label><br />
          <input maxLength="30" type="name" id="name" onChange={this.handleSetUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd"><b>Enter a Password:</b></label><br />
          <input maxLength="30" type="password" id="pwd" onChange={this.handleSetPassword} />
        </div>
        <br />
        <button type="submit" onClick={this.createUser}>Submit</button>
        <a href='/'><p>Go Back</p></a>
      </div>
    )
  }
}
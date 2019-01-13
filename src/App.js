import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Account from './Components/NewAccount/Account';
import Todo from './Components/TodoPage/Todo';
export default class App extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:3030/api')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/createuser" component={Account} />
          <Route exact path="/todo" component={Todo} />
        </Switch>
      </BrowserRouter>
    );
  }
}


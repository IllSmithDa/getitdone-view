import React from 'react';
import axios from 'axios';
import './Todo.css';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoID: this.props.id,
      todoData: this.props.data,
      username : this.props.username,
      todoChange: '',
      
    }
  }
  // show edit options 
  displayEdit = () => {
    const { todoID } = this.state;
    console.log(todoID)
    document.getElementById(todoID).style.display = "block";
  }
  // remove edit options from display
  removeDisplayEdit = () => {
    const { todoID } = this.state;
    console.log(todoID)
    document.getElementById(todoID).style.display = "none";
  }
  changeTodo = (event) => {
    this.setState({ todoChange: event.target.value })
  }
  submitChanges = () => {
    const { todoID, todoChange, username } = this.state;
    console.log(todoChange);
    const editTodo = {id: todoID, todoitem: todoChange, username }
    axios.put("http://localhost:3030/editTodo", editTodo)
      .then((data) => {
        console.log(data.data);
        window.location = "/todo"
      })
      .catch((err) => {
        throw err;
      })
  }
  deleteItem = () => {
    const { todoID, todoData, username } = this.state;
    console.log(todoData);
    const deleteTodo = {id: todoID, todoitem: todoData, username }
    axios.post("http://localhost:3030/deleteTodo", deleteTodo)
      .then(() => {
        window.location = '/todo';
      })
      .catch((err) => {
        throw err;
      })
  }
  render() {
    const {todoID, todoData} = this.state;
    return(
      <div>
        <p>{todoData}</p>
        <button id={'item' + todoID} onClick={this.displayEdit}>Edit</button>
        <button onClick={this.deleteItem}>Delete </button>
        <div id={todoID} className="edit-container">
          <input onChange={this.changeTodo}></input>
          <button onClick={this.submitChanges}>Submit</button>
          <button onClick={this.removeDisplayEdit}>Cancel</button>
        </div>
      </div>
    )
  }
}
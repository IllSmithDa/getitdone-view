import React from 'react';
import axios from 'axios';
import Edit from './Edit';
import './Todo.css';
export default class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      newTask: '',
      username: '', 
      editTodo: '',
    }
  }
  componentWillMount() {
    const { todo } = this.state;
    axios.get("http://localhost:3030/testsess")
    .then((data) => {
      if (data.data.message === "Error: Session not found") {
        window.location = "/";
        return;
      }
      this.setState({ username: data.data.username})
      axios.get('http://localhost:3030/getTodoList')
      .then((data) => {
        console.log(data.data);
        const todoList = [];
        if (data.data.todoList !== null) {
          for (let i = 0; i < data.data.todoIDs.length; i++) {
            todoList.push({ todoID: data.data.todoIDs[i], todoData: data.data.todolist[i] })
            console.log(todoList)
          }
          this.setState({ todo: todoList})
          console.log(this.state.todo)
        }
      })
      .catch((err) => {
        throw err;
      })
    })
    .catch((err) => {
      throw err;
    })
    
  }

  handleTaskChange = (event) => {
    this.setState({ newTask: event.target.value })
  }

  logOutUser = () => {
    axios.get("http://localhost:3030/logout")
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        throw err;
      })
  }
  addTodoItem = () => {
    const { newTask, username } = this.state;
    console.log(newTask)
    const todoentry = {  id: 0, todoitem: newTask, username };
    axios.post("http://localhost:3030/addtodo", todoentry)
      .then(() => {
        // get the list again to update front end
        axios.get('http://localhost:3030/getTodoList')
        .then((data) => {
          console.log(data.data);
          if (data.data.message) {
            console.log(data.data.message);
          }
          const todoList = [];
          for (let i = 0; i < data.data.todoIDs.length; i++) {
            todoList.push({ todoID: data.data.todoIDs[i], todoData: data.data.todolist[i] })
            console.log(todoList)
          }
          this.setState({ todo: todoList})
          console.log(this.state.todo)
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
      })
      .catch((err) => {
        throw err;
      })
  }

  displayEdit = (todoID) => {
    console.log(todoID)
    document.getElementById(todoID).style.display = "block";
  }

  todolist = () => {
    const { todo, username } = this.state;
    const todoArr = [];
    for (let i = 0; i < todo.length; i++) {
      console.log(todo[i].todoData)
      todoArr.push(<Edit key={todo[i].todoID} id={todo[i].todoID} data={todo[i].todoData} username={username}/>)
    }
    console.log(todoArr)
    return todoArr;
  }

  changeTodo = (event) => {
    this.setState({ editTodo: event.target.value })
  }

  render() {
    const { username } = this.state;
    if (username === "") {
      return(
        <div>
          <h1> Loading To Do List </h1>
        </div>
      )
    }
    return(
      <div className="page-margins">
        <h1> {username[0].toUpperCase() + username.slice(1)}'s To Do List</h1>
        <h3>Lists of Tasks </h3>
        <div>
        {this.todolist()}
        </div>
        <div>
          <label htmlFor="name"><b>Enter a Task:</b></label><br />
          <input maxLength="100" type="name" id="newtask" onChange={this.handleTaskChange} />
          <button onClick={this.addTodoItem}> Add Task </button>
        </div>
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    )
  }
}

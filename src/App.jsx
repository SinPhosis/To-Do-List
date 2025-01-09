import React, { Component } from "react";
import "./App.css";

class Button extends Component {
  render() {
    return (
      <button
        className={this.props.buttonClass}
        onClick={this.props.handleClick}
      >
        <h3 className={this.props.h3Class}>{this.props.label}</h3>
      </button>
    );
  }
}

class TaskItem extends Component {
  render() {
    return (
      <div
        className={`task ${this.props.isActive ? "active" : ""}`}
        id={this.props.isChecked ? "completed" : ""}
      >
        <input
          type="checkbox"
          checked={this.props.isChecked}
          onChange={this.props.onCheckboxChange}
        />
        <span
          className="Span"
          style={{
            textDecorationLine: this.props.isChecked ? "line-through" : "none",
          }}
        >
          {this.props.task}
        </span>
        <button className="Active-Button" onClick={this.props.onToggleActive}>
          Active
        </button>
        <button className="Delete-Button" onClick={this.props.onDelete}>
          Delete
        </button>
        <button className="Log-Button" onClick={this.props.onLog}>
          Log
        </button>
      </div>
    );
  }
}

class Task extends Component {
  render() {
    return (
      <div>
        <TaskItem
          isActive={this.props.isActive}
          isChecked={this.props.isChecked}
          onCheckboxChange={this.props.onCheckboxChange}
          task={this.props.task}
          onDelete={this.props.onDelete}
          onToggleActive={this.props.onToggleActive}
          onLog={this.props.onLog}
          addTime={this.props.addTime}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: "Tab",
      tasks: [],
      newTask: "",
      activeTask: null,
      completedTasks: {},
      loggedTasks: {},
    };
  }

  handleClick = (buttonClass) => {
    this.setState({ activeButton: buttonClass });
  };

  handleAddTask = () => {
    if (this.state.newTask.trim()) {
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, { task: prevState.newTask }],
        newTask: "",
      }));
    }
  };

  handleDeleteTask = (index) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((_, i) => i !== index),
    }));
  };

  handleToggleActiveTask = (index) => {
    this.setState((prevState) => ({
      activeTask: index === prevState.activeTask ? null : index,
    }));
  };

  handleClearCompleted = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(
        (_, index) => !prevState.completedTasks[index] || prevState.loggedTasks[index]
      ),
      completedTasks: Object.keys(prevState.completedTasks).reduce((acc, key) => {
        if (prevState.loggedTasks[key]) {
          acc[key] = prevState.completedTasks[key];
        }
        return acc;
      }, {}),
    }));
  };

  handleonLog = (index) => {
    this.setState((prevState) => ({
      loggedTasks: {
        ...prevState.loggedTasks,
        [index]: !prevState.loggedTasks[index],
      },
    }));
  };

  handleCheckboxChange = (index) => {
    this.setState((prevState) => ({
      completedTasks: {
        ...prevState.completedTasks,
        [index]: !prevState.completedTasks[index],
      },
    }));
  };

  render() {
    const filteredTasks =
      this.state.activeButton === "Tab3"
        ? this.state.tasks.filter(
            (_, index) => this.state.completedTasks[index]
          )
        : this.state.activeButton === "Tab2"
        ? this.state.tasks.filter(
            (_, index) => this.state.completedTasks[index]
          )
        : this.state.activeButton === "Tab1"
        ? this.state.tasks.filter((_, index) => index === this.state.activeTask)
        : this.state.activeButton === "Log"
        ? this.state.tasks.concat(
            Object.keys(this.state.loggedTasks)
              .filter((index) => !this.state.tasks[index])
              .map((index) => ({ task: `${index}` }))
            )
        : this.state.tasks;

    return (
      <div className="Site">
        <div className="App">
          <div className="board">
            <div className="container">
              <div className="container1">
                <h2 className="Name-Of-The-List">To-Do List</h2>
                <div className="inputContainer">
                  <input
                    type="text"
                    maxLength={15}
                    className="input-To-Write-Tasks"
                    placeholder="Add a new task"
                    value={this.state.newTask}
                    onChange={(e) => this.setState({ newTask: e.target.value })}
                  />
                  <button className="add-Button" onClick={this.handleAddTask}>
                    <h3 className="Add">Add</h3>
                  </button>
                </div>
                <div className="Filter-Container">
                  <Button
                    buttonClass={
                      this.state.activeButton === "Tab" ? "Tab" : "Tab1"
                    }
                    handleClick={() => this.handleClick("Tab")}
                    label="All"
                    h3Class={
                      this.state.activeButton === "Tab" ? "Tab-H3" : "Tab1-H3"
                    }
                  />
                  <Button
                    buttonClass={
                      this.state.activeButton === "Tab1" ? "Tab" : "Tab1"
                    }
                    handleClick={() => this.handleClick("Tab1")}
                    label="Active"
                    h3Class={
                      this.state.activeButton === "Tab1" ? "Tab-H3" : "Tab1-H3"
                    }
                  />
                  <Button
                    buttonClass={
                      this.state.activeButton === "Tab2" ? "Tab" : "Tab1"
                    }
                    handleClick={() => this.handleClick("Tab2")}
                    label="Completed"
                    h3Class={
                      this.state.activeButton === "Tab2" ? "Tab-H3" : "Tab1-H3"
                    }
                  />
                  <Button
                    buttonClass={
                      this.state.activeButton === "Log" ? "Tab" : "Tab1"
                    }
                    handleClick={() => this.handleClick("Log")}
                    label="Log"
                    h3Class={
                      this.state.activeButton === "Log" ? "Tab-H3" : "Tab1-H3"
                    }
                  />
                </div>
                {filteredTasks.map((task, index) => (
                  <Task
                    key={index}
                    task={task.task}
                    isActive={this.state.activeTask === index}
                    isChecked={this.state.completedTasks[index]}
                    onCheckboxChange={() => this.handleCheckboxChange(index)}
                    onDelete={() => this.handleDeleteTask(index)}
                    onToggleActive={() => this.handleToggleActiveTask(index)}
                    onLog={() => this.handleonLog(index)}
                  />
                ))}
              </div>
              <div className="textandbutton">
                  <h2 className="completed">
                    {Object.keys(this.state.completedTasks).length} of{" "}
                    {this.state.tasks.length} tasks completed
                  </h2>
                  <button
                    className="Clear-Button"
                    onClick={this.handleClearCompleted}
                  >
                    Clear completed
                  </button>
                </div>
                <div className="Footer">
                  <h3 className="idk">Powered By</h3>
                  <a className="Footer-Link">Pinecone Academy</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
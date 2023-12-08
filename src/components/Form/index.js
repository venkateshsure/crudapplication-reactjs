import { Component } from "react";
import { v4 } from "uuid";
import { format } from "date-fns";

import Task from "../Task";

import "./index.css";

const priorityTaskList = [
  {
    id: "HIGH",
    type: "High",
  },
  {
    id: "LOW",
    type: "Low",
  },
  {
    id: "MEDIUM",
    type: "Medium",
  },
];

const statusList = [
  {
    id: "COMPLETED",
    progress: "Completed",
  },
  {
    id: "INPROGRESS",
    progress: "In Progress",
  },
  {
    id: "NOT COMPLETED",
    progress: "Not Completed",
  },
];

class Form extends Component {
  state = {
    taskList: [],
    titleInput: "",
    dateInput: "",
    description: "",
    searchTask: "",
    editingTask: null,
    initialPriority: priorityTaskList[0].type,
    status: statusList[0].progress,
  };

  onChangeDateInput = (event) => {
    this.setState({ dateInput: event.target.value });
  };

  onChangeTitleInput = (event) => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onChangePriority = (event) => {
    this.setState({ initialPriority: event.target.value });
  };

  onChangeStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  onAddTasks = (event) => {
    event.preventDefault();
    const {
      titleInput,
      dateInput,
      description,
      initialPriority,
      status,
    } = this.state;
    const formattedDate = dateInput
      ? format(new Date(dateInput), "dd MMMM yyyy, EEEE")
      : "";
    const newTask = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      description,
      priority: initialPriority,
      status,
    };

    this.setState((prevState) => ({
      taskList: [...prevState.taskList, newTask],
      titleInput: "",
      dateInput: "",
      description: "",
      initialPriority: priorityTaskList[0].id,
      status: statusList[0].id,
    }));
  };

  onDeleteTask = (id) => {
    console.log(id);
    this.setState((prevState) => ({
      taskList: prevState.taskList.filter((eachTask) => eachTask.id !== id),
    }));
  };

  onSearchTask = (event) => {
    this.setState({ searchTask: event.target.value });
  };

  onEnterSearch = (event) => {
    const { taskList, searchTask } = this.state;

    const filteredTasks = taskList.filter((eachTask) =>
      eachTask.title.toLowerCase().includes(searchTask.toLowerCase())
    );

    this.setState({ taskList: filteredTasks });
  };

  onEditTask = (id) => {
    const { taskList } = this.state;
    const editTask = taskList.find((each) => each.id === id);
    this.setState({ editingTask: { ...editTask } });
  };

  onSaveEdit = () => {
    const { taskList, editingTask } = this.state;
    const updatedTaskList = taskList.map((task) =>
      task.id === editingTask.id ? editingTask : task
    );

    this.setState({
      taskList: updatedTaskList,
      editingTask: null,
    });
  };

  onUpdateEditingTask = (field, value) => {
    this.setState((prevState) => ({
      editingTask: {
        ...prevState.editingTask,
        [field]: value,
      },
    }));
  };

  render() {
    const {
      titleInput,
      dateInput,
      description,
      initialPriority,
      status,
      taskList,
    } = this.state;

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="tasks-container">
            <div className="add-task-container">
              <form className="form" onSubmit={this.onAddTasks}>
                <h1 className="add-task-heading">Tasks</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="description" className="label">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={this.onChangeDescription}
                  className="input"
                  placeholder="Description"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <label htmlFor="priority" className="label">
                  PRIORITY
                </label>
                <select
                  onChange={this.onChangePriority}
                  value={initialPriority}
                  id="priority"
                  className="select"
                >
                  {priorityTaskList.map((each) => (
                    <option key={each.id} value={each.type} className="option">
                      {each.type}
                    </option>
                  ))}
                </select>
                <label htmlFor="status" className="label">
                  STATUS
                </label>
                <select
                  onChange={this.onChangeStatus}
                  value={status}
                  id="status"
                  className="select"
                >
                  {statusList.map((each) => (
                    <option
                      key={each.id}
                      value={each.progress}
                      className="option"
                    >
                      {each.progress}
                    </option>
                  ))}
                </select>

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="task-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="tasks-heading">Each Task</h1>
              <div>
                <input
                  onChange={this.onSearchTask}
                  type="search"
                  width={90}
                  placeholder="search"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                  onClick={this.onEnterSearch}
                />
              </div>
            </div>
            <ul className="tasks-list">
              {taskList.length === 0 ? (
                <h1 className="not-found-heading">No Tasks Found Here</h1>
              ) : (
                taskList.map((eachTask) => (
                  <Task
                    key={eachTask.id}
                    eachTask={eachTask}
                    onDeleteTask={this.onDeleteTask}
                    onEditTask={this.onEditTask}
                    onSaveEdit={this.onSaveEdit}
                    editingTask={this.state.editingTask}
                    onUpdateEditingTask={this.onUpdateEditingTask}
                    priorityTaskList={priorityTaskList}
                    statusList={statusList}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;

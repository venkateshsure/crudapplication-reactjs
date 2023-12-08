import EditForm from "../EditForm";

import { MdDelete, MdOutlineEdit } from "react-icons/md";
// import { FaSave } from "react-icons/fa";

import "./index.css";

const Task = (props) => {
  const {
    eachTask,
    onDeleteTask,
    onEditTask,
    priorityTaskList,
    statusList,
  } = props;

  const { id, title, date, description, priority, status } = eachTask;

  const onClickDelete = () => {
    onDeleteTask(id);
  };

  const onClickEdit = () => {
    onEditTask(id);
  };

  const onUpdateEditingTask = (field, value) => {
    props.onUpdateEditingTask(field, value);
  };

  return (
    <li className="task-item">
      {props.editingTask && props.editingTask.id === id ? (
        <EditForm
          editingTask={props.editingTask}
          onUpdateEditingTask={onUpdateEditingTask}
          onSaveEdit={props.onSaveEdit}
          priorityTaskList={priorityTaskList}
          statusList={statusList}
        />
      ) : (
        <>
          <div className="header-container">
            <p className="title">{title}</p>
            <div className="header-icons-container">
              <button
                type="button"
                data-testid="delete"
                className="star-button"
                onClick={onClickDelete}
              >
                <MdDelete />
              </button>
              <button
                type="button"
                data-testid="edit"
                className="star-button"
                onClick={onClickEdit}
              >
                <MdOutlineEdit />
              </button>
            </div>
          </div>

          <div className="bottom-container">
            <p className="title">{description}</p>
            <p className="title">{priority}</p>
            <p className="title">{status}</p>
            <p className="date">Date: {date}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;

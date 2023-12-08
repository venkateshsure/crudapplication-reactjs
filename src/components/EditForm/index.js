import "./index.css";

const EditForm = (props) => {
  const {
    editingTask,
    onUpdateEditingTask,
    onSaveEdit,
    priorityTaskList,
    statusList,
  } = props;

  const onFieldChange = (field, value) => {
    onUpdateEditingTask(field, value);
  };

  return (
    <div className="edit-form-container">
      <label htmlFor="editTitle" className="label">
        Title:
      </label>
      <input
        type="text"
        id="editTitle"
        value={editingTask.title}
        className="input"
        onChange={(e) => onFieldChange("title", e.target.value)}
      />

      <label htmlFor="editDescription" className="label">
        Description:
      </label>
      <input
        type="text"
        id="editDescription"
        className="input"
        value={editingTask.description}
        onChange={(e) => onFieldChange("description", e.target.value)}
      />

      <label htmlFor="editDate" className="label">
        Date:
      </label>
      <input
        type="date"
        id="editDate"
        className="input"
        value={editingTask.date}
        onChange={(e) => onFieldChange("date", e.target.value)}
      />

      <label htmlFor="editPriority" className="label">
        Priority:
      </label>
      <select
        id="editPriority"
        className="edit-form-select"
        value={editingTask.priority}
        onChange={(e) => onFieldChange("priority", e.target.value)}
      >
        {priorityTaskList.map((each) => (
          <option key={each.id} value={each.type} className="option">
            {each.type}
          </option>
        ))}
      </select>

      <label htmlFor="editStatus" className="label">
        Status:
      </label>
      <select
        id="editStatus"
        className="edit-form-select"
        value={editingTask.status}
        onChange={(e) => onFieldChange("status", e.target.value)}
      >
        {statusList.map((each) => (
          <option key={each.id} value={each.progress} className="option">
            {each.progress}
          </option>
        ))}
      </select>

      <button type="button" className="add-button" onClick={onSaveEdit}>
        Save
      </button>
    </div>
  );
};

export default EditForm;

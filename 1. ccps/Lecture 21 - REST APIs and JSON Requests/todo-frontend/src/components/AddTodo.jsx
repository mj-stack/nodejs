import { useContext, useRef } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { TodoItemsContext } from "../store/todo-item-store";
import { addItemToServer } from "../services/itemsService";

function AddTodo() {
  const { addNewItem } = useContext(TodoItemsContext);

  const todoNameElement = useRef();
  const dueDateElement = useRef();

  const handleAddButtonClick = async (e) => {
    e.preventDefault();
    const todoName = todoNameElement.current.value;
    const todoDueDate = dueDateElement.current.value;
    const item = await addItemToServer(todoName, todoDueDate);
    addNewItem(item);
    todoNameElement.current.value = "";
    dueDateElement.current.value = "";
  };

  return (
    <div style={{ textAlign: "left" }} className="container">
      <form className="row kg-row" onSubmit={handleAddButtonClick}>
        <div className="col-6">
          <input
            ref={todoNameElement}
            type="text"
            placeholder="Enter Todo here"
            required
          />
        </div>
        <div className="col-4">
          <input ref={dueDateElement} type="date" required />
        </div>
        <div className="col-2">
          <button className="btn btn-success kg-button">
            <BiMessageAdd />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;

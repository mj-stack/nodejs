import { useContext } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TodoItemsContext } from "../store/todo-item-store";

function TodoItem({todoName, todoDate}) {
  const {deleteItem} = useContext(TodoItemsContext)

  return(
    <div className="container">
      <div className="row kg-row">
        <div className="col-6">
          {todoName}
        </div>
        <div className="col-4">
          {todoDate}
        </div>
        <div className="col-2">
          <button type="button" onClick={() => deleteItem(todoName)} className="btn btn-danger kg-button"><RiDeleteBack2Fill /></button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
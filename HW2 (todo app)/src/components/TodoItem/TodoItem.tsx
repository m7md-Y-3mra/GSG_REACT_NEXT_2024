import "./TodoItem.css";
import { Delete, Edit } from "@mui/icons-material";
import { todoItem } from "../../types";
import {memo} from "react";

interface IProps {
  todo: todoItem,
  prioriyClass: string,
  onDelete: (todoId: number) => void,
  onEdit: (todo: todoItem) => void,
  onToggleCompletion: (todoId: number) => void
}

function TodoItem({
  todo,
  prioriyClass,
  onDelete,
  onEdit,
  onToggleCompletion,
}: IProps) {    
  return (
    <div className={`todo-item-container ${prioriyClass}`}>
      <div className="todo-item">
        <input type="checkbox" id={String(todo.id)} defaultChecked={todo.isCompleted} />
        <label htmlFor={String(todo.id)} onClick={() => onToggleCompletion(todo.id)}>
          <span>{todo.label}</span>
        </label>
      </div>
      <div className="todo-actions">
        <button onClick={() => onDelete(todo.id)}>{<Delete />}</button>
        <button onClick={() => onEdit(todo)}>{<Edit />}</button>
      </div>
    </div>
  );
}

export default memo(TodoItem);
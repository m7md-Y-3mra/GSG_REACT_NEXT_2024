import { useMemo } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { todoItem } from "../../types";

interface TodoList {
  status: string;
  startEditing: (todo: todoItem) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodoCompletion: (id: number) => void;
  filterTodosByStatus: (status: string) => todoItem[];
  allTodosNo: number;
}

export default function TodoList({ status, startEditing, deleteTodo, toggleTodoCompletion, filterTodosByStatus, allTodosNo }: TodoList) {
  const renderTodosList = useMemo(() => {
    return filterTodosByStatus(status).map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          prioriyClass={`priority-${todo.priority}`}
          onEdit={() => startEditing(todo)}
          onDelete={deleteTodo}
          onToggleCompletion={toggleTodoCompletion}
        />
      );
    });
  }, [
    deleteTodo,
    toggleTodoCompletion,
    filterTodosByStatus,
    status,
    startEditing,
  ]);

  return allTodosNo > 0 ? (
    <div className="todo-list ">{renderTodosList}</div>
  ) : (
    <div className="empty-todo-list">No todos</div>
  );
}

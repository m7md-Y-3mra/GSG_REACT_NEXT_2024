import { useCallback, useMemo } from "react";
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
  const memoizedTodos = useMemo(() => filterTodosByStatus(status), [filterTodosByStatus, status]);

  return allTodosNo > 0 ? (
    <div className="todo-list">
      {memoizedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo} 
          prioriyClass={`priority-${todo.priority}`}
          onEdit={startEditing}
          onDelete={deleteTodo}
          onToggleCompletion={toggleTodoCompletion}
        />
      ))}
    </div>
  ) : (
    <div className="empty-todo-list">No todos</div>
  );
}

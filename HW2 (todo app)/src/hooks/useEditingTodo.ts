import { useCallback, useState } from "react";
import { todoItem } from "../types";

export function useEditingTodo() {
  const [editingTodo, setEditingTodo] = useState<todoItem | null>(null);

  const startEditing = useCallback((todo: todoItem) => {
    setEditingTodo(todo);
  }, []);

  const stopEditing = () => {
    setEditingTodo(null);
  };

  return { editingTodo, startEditing, stopEditing, setEditingTodo };
}

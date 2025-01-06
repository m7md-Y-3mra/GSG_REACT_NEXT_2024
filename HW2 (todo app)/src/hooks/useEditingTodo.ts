import { useCallback, useState } from "react";
import { todoItem } from "../types";

export function useEditingTodo() {
  const [editingTodo, setEditingTodo] = useState<todoItem | null>(null);
  
  const startEditing = useCallback((todo: todoItem) => {  
    console.log(todo);
      
    setEditingTodo(todo);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingTodo(null);
  },[])

  return { editingTodo, startEditing, stopEditing, setEditingTodo};
}

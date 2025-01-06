import { useCallback, useMemo } from "react";
import { todoItem } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<todoItem[]>("todos", []);
  const [nextId, setNextId] = useLocalStorage<number>("nextId", 0);

  const addTodo = (todoLabel: string, priorityClass: number) => {
    const newTodo: todoItem = {
      id: nextId,
      label: todoLabel.trim(),
      priority: priorityClass,
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNextId(nextId + 1);
  };

  const toggleTodoCompletion = useCallback(
    (id: number) => {
      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (todoId: number) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
    },
    [setTodos]
  );

  const updateTodoDetails = useCallback(
    (editingTodoId: number, updatedLabel: string, updatedPriority: number) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodoId
          ? { ...todo, label: updatedLabel, priority: updatedPriority }
          : todo
      );
      setTodos(updatedTodos);
    },
    [todos, setTodos]
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.isCompleted),
    [todos]
  );

  const notCompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.isCompleted),
    [todos]
  );

  const filterTodosByStatus = useCallback(
    (status: string) => {
      switch (status) {
        case "completed":
          return completedTodos;
        case "notCompleted":
          return notCompletedTodos;
        default:
          return todos;
      }
    },
    [todos, completedTodos, notCompletedTodos]
  );

  function handleClearCompletedClick() {
    setTodos(notCompletedTodos);
  }

  return {
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
    updateTodoDetails,
    filterTodosByStatus,
    handleClearCompletedClick,
    completedTodosNo: completedTodos.length,
    allTodosNo: todos.length,
  };
}

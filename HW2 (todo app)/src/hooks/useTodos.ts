import { useCallback, useEffect, useMemo, useReducer } from "react";
import { todoItem } from "../types";
import { usePersistentState } from "./usePersistentState";
import { todoReducer, TodoState, TodoActionKind } from "../reducers/todosReducer";
import { usePersistentReducer } from "./usePersistentReducer";
import { TodoAction } from "../reducers/todosReducer2";

export function useTodos() {
  // const [todos, setTodos] = useLocalStorage<todoItem[]>("todos", []);
  // const [nextId, setNextId] = useLocalStorage<number>("nextId", 0);

  // const [state, dispatch] = useReducer(todoReducer, { todos: [], nextId: 0 }, (initial) => {
  //   const stored = localStorage.getItem("todos");
  //   return stored ? JSON.parse(stored) : initial;
  // });

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(state));
  // }, [state]);

  const [state, dispatch] = usePersistentReducer<TodoState, TodoAction>("todos", todoReducer, { todos: [], nextId: 0 });

  const addTodo = (label: string, priority: number) => {
    dispatch({ type: TodoActionKind.ADD, payload: { label, priority } });
  };

  const toggleTodoCompletion = useCallback((id: number) => {
    dispatch({ type: TodoActionKind.TOGGLE, payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: TodoActionKind.DELETE, payload: { id } });
  }, []);

  const updateTodoDetails = useCallback(
    (id: number, label: string, priority: number) => {
      dispatch({ type: TodoActionKind.UPDATE, payload: { id, label, priority } });
    },
    []
  );

  // const completedTodos = useMemo(
  //   () => dispatch({ type: "FILTER_COMPLETED_TODOS" }),
  //   []
  // );

  // const notCompletedTodos = useMemo(
  //   dispatch({ type: "FILTER_NOT_COMPLETED_TODOS" }),
  //   []
  // );

  const completedTodos = useMemo(
    () => state.todos.filter((todo) => todo.isCompleted),
    [state.todos]
  );

  const notCompletedTodos = useMemo(
    () => state.todos.filter((todo) => !todo.isCompleted),
    [state.todos]
  );

  // const allTodos = useMemo(() => dispatch({ type: "FILTER_ALL_TODOS" }), []);

  const filterTodosByStatus = useCallback(
    (status: string) => {
      switch (status) {
        case "completed":
          return completedTodos;
        case "notCompleted":
          return notCompletedTodos;
        default:
          return state.todos;
      }
    },
    [completedTodos, notCompletedTodos, state.todos]
  );

  function handleClearCompletedClick() {
    dispatch({type: TodoActionKind.CLEAR})
  }

  return {
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
    updateTodoDetails,
    filterTodosByStatus,
    handleClearCompletedClick,
    completedTodosNo: completedTodos.length,
    allTodosNo: state.todos.length,
  };
}

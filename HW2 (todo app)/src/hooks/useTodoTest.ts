// // src/hooks/useTodos.ts
// import { useReducer, useCallback, useEffect, useMemo } from "react";
// import { todoItem } from "../types";
// import { useLocalStorage } from "./useLocalStorage";
// import { TodoState, TodoAction, todoReducer } from "../reducers/todoReducer";

// // Custom hook using useReducer
// export function useTodos() {
//   const [state, dispatch] = useReducer(todoReducer, { todos: [], nextId: 0 });
//   const [storedState, setStoredState] = useLocalStorage<TodoState>(
//     "todos",
//     state
//   );

//   // Sync local storage with state
//   useEffect(() => {
//     setStoredState(state);
//   }, [state, setStoredState]);

//   const addTodo = useCallback((label: string, priority: number) => {
//     dispatch({ type: "ADD_TODO", payload: { label, priority } });
//   }, []);

//   const deleteTodo = useCallback((id: number) => {
//     dispatch({ type: "DELETE_TODO", payload: { id } });
//   }, []);

//   const toggleTodoCompletion = useCallback((id: number) => {
//     dispatch({ type: "TOGGLE_TODO", payload: { id } });
//   }, []);

//   const updateTodoDetails = useCallback(
//     (id: number, label: string, priority: number) => {
//       dispatch({
//         type: "UPDATE_TODO",
//         payload: { id, label, priority },
//       });
//     },
//     []
//   );

//   const handleClearCompletedClick = useCallback(() => {
//     dispatch({ type: "CLEAR_COMPLETED" });
//   }, []);

//   // Filter completed and not completed todos
//   const completedTodos = useMemo(
//     () => state.todos.filter((todo) => todo.isCompleted),
//     [state.todos]
//   );

//   const notCompletedTodos = useMemo(
//     () => state.todos.filter((todo) => !todo.isCompleted),
//     [state.todos]
//   );

//   // Filter todos by status (completed, notCompleted, all)
//   const filterTodosByStatus = useCallback(
//     (status: string) => {
//       switch (status) {
//         case "completed":
//           return completedTodos;
//         case "notCompleted":
//           return notCompletedTodos;
//         default:
//           return state.todos;
//       }
//     },
//     [completedTodos, notCompletedTodos, state.todos]
//   );

//   return {
//     todos: state.todos,
//     addTodo,
//     deleteTodo,
//     toggleTodoCompletion,
//     updateTodoDetails,
//     handleClearCompletedClick,
//     filterTodosByStatus, // Added here
//     completedTodosNo: completedTodos.length,
//     allTodosNo: state.todos.length,
//   };
// }

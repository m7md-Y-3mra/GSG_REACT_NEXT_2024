// src/reducers/todoReducer.ts
import { todoItem } from "../types";

// Action types
export type TodoAction =
  | { type: "ADD_TODO"; payload: { label: string; priority: number } }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "UPDATE_TODO"; payload: { id: number; label: string; priority: number } }
  | { type: "CLEAR_COMPLETED" };

// State type
export type TodoState = {
  todos: todoItem[];
  nextId: number;
};

// Reducer function
export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: todoItem = {
        id: state.nextId,
        label: action.payload.label.trim(),
        priority: action.payload.priority,
        isCompleted: false,
      };
      return {
        todos: [...state.todos, newTodo],
        nextId: state.nextId + 1,
      };
    }
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                label: action.payload.label,
                priority: action.payload.priority,
              }
            : todo
        ),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      };
    default:
      return state;
  }
}

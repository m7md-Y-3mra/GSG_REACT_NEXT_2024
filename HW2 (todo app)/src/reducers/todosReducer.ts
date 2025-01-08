import { todoItem } from "../types";

export enum TodoActionKind {
  ADD = "ADD_TODO",
  DELETE = "DELETE_TODO",
  TOGGLE = "TOGGLE_TODO",
  UPDATE = "UPDAET_TODO",
  CLEAR = "CLEAR_COMPLETED",
}

export type TodoAction =
  | {
      type: TodoActionKind.ADD;
      payload: { label: string; priority: number };
    }
  | {
      type: TodoActionKind.DELETE;
      payload: { id: number };
    }
  | {
      type: TodoActionKind.TOGGLE;
      payload: { id: number };
    }
  | {
      type: TodoActionKind.UPDATE;
      payload: {
        id: number;
        label: string;
        priority: number;
      };
    }
  | {
      type: TodoActionKind.CLEAR;
    };

export type TodoState = {
  todos: todoItem[];
  nextId: number;
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case TodoActionKind.ADD: {
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
    case TodoActionKind.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TodoActionKind.UPDATE:
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
    case TodoActionKind.TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case TodoActionKind.CLEAR:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      };
    default:
      return state;
  }
}

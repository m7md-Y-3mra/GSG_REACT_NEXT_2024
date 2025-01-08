import { todoItem } from "../types";

export enum TodoActionKind {
  ADD = "ADD_TODO",
  DELETE = "DELETE_TODO",
  TOGGLE = "TOGGLE_TODO",
  UPDATE = "UPDAET_TODO",
  CLEAR = "CLEAR_COMPLETED",
  COMPLETED_TODOS = "FILTER_COMPLETED_TODOS",
  NOT_COMPLETED_TODOS = "FILTER_NOT_COMPLETED_TODOS",
  ALL_TODOS = "FILTER_ALL_TODOS",
  SET_STATE = "SET_STATE",
}

type TodosAction =
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
      type: TodoActionKind.SET_STATE;
      payload: {
        todos: TodoState;
      };
    }
  | {
      type: TodoActionKind.COMPLETED_TODOS;
    }
  | {
      type: TodoActionKind.NOT_COMPLETED_TODOS;
    }
  | {
      type: TodoActionKind.ALL_TODOS;
    }
  | {
      type: TodoActionKind.CLEAR;
    };

export type TodoState = {
  todos: todoItem[];
  nextId: number;
};

export function todoReducer(state: TodoState, action: TodosAction): TodoState {
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
    case TodoActionKind.COMPLETED_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.isCompleted),
      };
    case TodoActionKind.NOT_COMPLETED_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      };
    case TodoActionKind.SET_STATE:
      return {
        ...action.payload.todos,
      };
    default:
      return state;
  }
}

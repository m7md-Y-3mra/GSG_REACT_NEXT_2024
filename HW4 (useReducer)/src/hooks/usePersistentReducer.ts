import { useEffect, useReducer } from "react";

function getFromLocalStorage<T>(key: string, initialValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return initialValue;
  }
}

function setToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function usePersistentReducer<State, Action>(
  key: string,
  reducer: (state: State, action: Action) => State,
  initialState: State
): [State, React.Dispatch<Action>] {
  const storedState = getFromLocalStorage(key, initialState);
  const [state, dispatch] = useReducer(reducer, storedState);

  useEffect(() => {
    setToLocalStorage(key, state);
  }, [state, key]);

  return [state, dispatch];
}

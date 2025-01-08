import { useEffect, useState } from "react";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorageUtils";

// can use (value: T) => void insted of React.Dispatch<React.SetStateAction<T>>
export function usePersistentState<T>(key: string, initialValue: T) : [T, React.Dispatch<React.SetStateAction<T>>]{
    const [data, setData] = useState<T>(getFromLocalStorage<T>(key, initialValue));

    useEffect(() => {
        setToLocalStorage(key, data)
    }, [data, key])

    return [data, setData]
}


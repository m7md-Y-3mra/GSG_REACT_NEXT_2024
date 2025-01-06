import { useEffect, useState } from "react";

function getFromLocalStorage<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

function setToLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string, defaultValue: T) : [T, React.Dispatch<React.SetStateAction<T>>]{
    const [data, setData] = useState<T>(getFromLocalStorage<T>(key) ?? defaultValue);

    useEffect(() => {
        setToLocalStorage(key, data)
    }, [data, key])

    return [data, setData]
}



import { useLocalStorage } from "./useLocalStorage";

export function useDarkMode() :[boolean, () => void] {
    const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("theme", false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return [isDarkMode, toggleDarkMode];
}
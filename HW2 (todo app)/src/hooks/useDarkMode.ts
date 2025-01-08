import { usePersistentState } from "./usePersistentState";

export function useDarkMode() :[boolean, () => void] {
    const [isDarkMode, setIsDarkMode] = usePersistentState<boolean>("theme", false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return [isDarkMode, toggleDarkMode];
}
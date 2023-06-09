import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // Chceck if the value exists yet.
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue == null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            }  
            else {
                return initialValue;
            }
        }
        else {
            return JSON.parse(jsonValue);
        }
    })

    // If value is changed, update it.
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue];
}
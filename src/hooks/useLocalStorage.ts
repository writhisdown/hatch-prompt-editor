/****
 A custom hook to manage localStorage with React state and sanitization.
 *
 **** Features ****

 - Initializes state from localStorage if available, 
   otherwise falls back to provided default value.

 - Sanitizes string values using DOMPurify 
   before storing to prevent XSS vulnerabilities.

 - Handles both direct values and updater functions.

 - Keeps localStorage in sync with the latest sanitized value.

 - Returns the stored value and a setter function

 **** Params ****

 - key: - value to be stored in localStorage.
 - initialValue: default value if no localStorage item is found 
   i.e 'SAMPLE_SCRIPT'
****/

import { useState } from "react";
import DOMPurify from "dompurify";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
  
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (valueOrFunction: Function | string | undefined) => {
    const valueToStore = typeof valueOrFunction === "function" ? valueOrFunction(storedValue) : valueOrFunction;
    try {
      const sanitizedValue = typeof valueToStore === "string" ? DOMPurify.sanitize(valueToStore) : valueToStore;

      setStoredValue(sanitizedValue);

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(sanitizedValue));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, setValue] as const;
}
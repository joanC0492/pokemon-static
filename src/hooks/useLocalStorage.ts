import { useState, useEffect, useRef } from "react";

export const useLocalStorage = <T>(name: string, value: T) => {
  const [item, setItem] = useState<T>(value);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem(name) || "[]"));
  }, []);

  useEffect(() => {    
    if (isMounted.current === false) return;
    localStorage.setItem(name, JSON.stringify(item));
  }, [item]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return {
    item,
    setItem,
  };
};

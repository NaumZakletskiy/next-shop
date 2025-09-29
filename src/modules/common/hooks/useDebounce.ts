import { CONSTANTS } from "@/common/constants";
import { useState, useEffect } from "react";

export function useDebounce<Type>(
  value: Type | null,
  delay = CONSTANTS.DEBOUNCE_TIME_MS
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, debounceLoading: loading };
}

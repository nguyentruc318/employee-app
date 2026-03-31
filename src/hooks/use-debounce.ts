import { useEffect, useState } from "react";

export default function useDebounce({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const [debouncedValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

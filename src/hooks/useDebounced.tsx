import { useRef } from 'react';

export default function useDebouncedFunction(func: Function, delay: number) {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any[]) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
}

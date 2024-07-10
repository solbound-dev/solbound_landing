import { useCallback, useRef } from 'react';

interface UseDebounceCallbackParams {
  delay: number;
}

export const useDebounceCallback = ({ delay }: UseDebounceCallbackParams) => {
  const timeout = useRef<NodeJS.Timeout | null>();

  const debounce = useCallback(
    (fn: () => void) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        fn();
        timeout.current = null;
      }, delay);
    },
    [delay],
  );

  return { debounce };
};

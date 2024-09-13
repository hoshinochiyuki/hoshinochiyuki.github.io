import { useMemo } from 'react';

const useDebounceChange = <T,>(callBack: (e: T) => void, delay?: number) => {
  const onChange = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const change = (e: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callBack(e);
      }, delay ?? 1000);
    };
    return change;
  }, [callBack, delay]);

  return onChange;
};

export default useDebounceChange;

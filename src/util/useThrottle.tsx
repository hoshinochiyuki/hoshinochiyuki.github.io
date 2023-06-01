import { useCallback, useEffect, useRef } from 'react';

const useThrottle = (fn: () => void, delay: number, dep = []) => {
  const { current } = useRef<{
    fn: () => void;
    timer?: null | NodeJS.Timeout;
  }>({ fn, timer: null });

  useEffect(
    function () {
      current.fn = fn;
    },
    [fn],
  );

  return useCallback(() => {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn();
    }
  }, dep);
};

export default useThrottle;

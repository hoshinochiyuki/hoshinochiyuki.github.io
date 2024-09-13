/* eslint-disable react-hooks/exhaustive-deps */
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

interface UseResizeObserverProps extends PropsWithChildren {
  callBackFn: (width: number) => void;
  delay?: number;
}

const DebounceResizeObserver: FC<UseResizeObserverProps> = (props) => {
  const { children, callBackFn, delay } = props;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callBackFn?.(elementRef.current?.clientWidth ?? 0);
      }, delay ?? 500);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    elementRef.current && resizeObserver.observe(elementRef.current);
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [delay]);

  return <div ref={elementRef}>{children}</div>;
};

export default DebounceResizeObserver;

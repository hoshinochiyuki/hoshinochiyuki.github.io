import { useState } from 'react';

import { InputNumber } from 'antd';

import ThrottleResizeObserver from './ThrottleResizeObserver';

const ResizeObserverPage = () => {
  const [width, setWidth] = useState<number>();
  const [delay, setDelay] = useState<number>(300);

  return (
    <div>
      <div className='px-4 py-4 flex justify-end'>
        <InputNumber
          className='w-[160px]'
          value={delay}
          min={0}
          max={1000}
          addonBefore='延迟'
          addonAfter='ms'
          onChange={(e) => setDelay(e ?? 0)}
        />
      </div>
      <ThrottleResizeObserver callBackFn={(e) => setWidth(e)} delay={delay}>
        <div className='pt-16 text-center h-full text-xl border-b flex justify-between'>
          <span>{'<-'}</span>
          {width}
          <span>{'->'}</span>
        </div>
      </ThrottleResizeObserver>
    </div>
  );
};

export default ResizeObserverPage;

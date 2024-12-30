import { useState } from 'react';

import { Input, InputNumber } from 'antd';

import DebounceResizeObserver from './DebounceResizeObserver';
import useDebounceChange from './useDebounceChange';

const ResizeObserverPage = () => {
  const [width, setWidth] = useState<number>();
  const [delay, setDelay] = useState<number>(500);
  const [value, setValue] = useState<string>();

  const onChange = useDebounceChange((e: string) => {
    setValue(e);
  }, delay);

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
      <DebounceResizeObserver callBackFn={(e) => setWidth(e)} delay={delay}>
        <div className='pt-16 text-center h-full text-xl border-b flex justify-between'>
          <span>{'<-'}</span>
          {width}
          <span>{'->'}</span>
        </div>
        <div className='mt-8 ml-4'>
          <div className='w-full mb-2'>
            <div>DebounceChange:</div>
            <Input
              onChange={(e) => onChange(e.target.value)}
              className='w-[300px]'
            />
          </div>
          <div className='w-full'>
            <div>value:</div>
            <Input readOnly value={value} className='w-[300px]' />
          </div>
        </div>
      </DebounceResizeObserver>
    </div>
  );
};

export default ResizeObserverPage;

import { FC, useState } from 'react';

import { random, times } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

import SnowSvg from '../../../assets/snow.svg';
import DebounceResizeObserver from '../../ResizeObserverPage/DebounceResizeObserver';
import './Snow.css';

const Snow: FC = () => {
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);

  return (
    <DebounceResizeObserver
      callBackFn={(e) => {
        const flakes = times(150, (index) => (
          <img
            key={index}
            className={twMerge('absolute snowflake')}
            src={SnowSvg}
            style={{
              animationDelay: `${Math.random() * 10}s`,
              right: random(0, e, true),
              animationDuration: `${random(2.5, 5, true)}s`
            }}
          />
        ));
        setSnowflakes(flakes);
      }}
      className='fixed top-0 left-0 w-full h-full pointer-events-none z-50'
    >
      {snowflakes}
    </DebounceResizeObserver>
  );
};

export default Snow;

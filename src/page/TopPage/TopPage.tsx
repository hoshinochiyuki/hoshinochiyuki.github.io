import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { twMerge } from 'tailwind-merge';

import Snow from './Snow/Snow';

const TopPage: FC = () => {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={twMerge(
        'z-30 flex justify-between bg-white h-[3.75rem] py-0 px-8 border-b border-lineWeak sticky top-0 left-0 w-full'
      )}
    >
      <Snow />
      <Button onClick={() => navigate('/sidebar')}>side</Button>
      top
    </div>
  );
};

export default TopPage;

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { twMerge } from 'tailwind-merge';

const TopPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className={twMerge(
        'z-30 flex justify-between bg-white h-[3.75rem] py-0 px-8 border-b border-lineWeak sticky top-0 left-0 w-full'
      )}
    >
      <Button onClick={() => navigate('/sidebar')}>side</Button>
      top
    </div>
  );
};

export default TopPage;

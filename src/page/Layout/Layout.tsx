import { FC } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Spin } from 'antd';

const Layout: FC = () => {
  return (
    <div id='layout'>
      <div className='h-[64px] px-6'></div>
      <div className='min-h-[calc(100vh-64px)]'>
        <React.Suspense fallback={<Spin className='h-[70vh]' />}>
          <Outlet />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Layout;

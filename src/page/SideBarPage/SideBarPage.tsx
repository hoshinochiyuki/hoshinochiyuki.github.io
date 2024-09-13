import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button, Layout, Menu } from 'antd';

import {
  LayoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SplitCellsOutlined
} from '@ant-design/icons';

import { twMerge } from 'tailwind-merge';

const { Sider, Content } = Layout;

const SideBarPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout className='h-[calc(100vh-64px)]'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={64}
        width={220}
      >
        <div
          className={twMerge(
            'mt-4',
            collapsed ? 'text-center mr-[6px]' : 'text-right'
          )}
        >
          <Button
            type='text'
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className='text-white' />
              ) : (
                <MenuFoldOutlined className='text-white' />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            className='!w-[48px] h-[48px] text-base hover:!text-blue'
          />
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          className='[&_.ant-menu-item]:!pl-4'
          items={[
            {
              key: 'dnd',
              icon: <LayoutOutlined />,
              onClick: () => navigate('dnd'),
              label: 'D&D'
            },
            {
              key: 'debounce',
              icon: <SplitCellsOutlined />,
              onClick: () => navigate('resizeObserver'),
              label: 'Debounce'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Content className='bg-white mx-6 my-4'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBarPage;

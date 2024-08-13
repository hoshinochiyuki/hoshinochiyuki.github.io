import { Navigate, createBrowserRouter } from 'react-router-dom';

import DndPage from './page/DndPage/DndPage';
import Layout from './page/Layout/Layout';
import ResizeObserverPage from './page/ResizeObserverPage/ResizeObserverPage';
import SideBarPage from './page/SideBarPage/SideBarPage';
import TopPage from './page/TopPage/TopPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        children: [
          {
            index: true,
            element: <Navigate to='top' />
          },
          {
            path: 'top',
            element: <TopPage />
          },
          {
            path: 'sidebar',
            element: <SideBarPage />,
            children: [
              {
                index: true,
                element: <Navigate to='dnd' />
              },
              {
                path: 'dnd',
                element: <DndPage />
              },
              {
                path: 'resizeObserver',
                element: <ResizeObserverPage />
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;

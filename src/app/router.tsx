import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { ListPage } from '../routes/ListPage';
import { MapPage } from '../routes/MapPage';
import { HouseDetailPage } from '../routes/HouseDetailPage';
import { SavedPage } from '../routes/SavedPage';
import { StaffSignInPage } from '../routes/StaffSignInPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/list" replace /> },
      { path: 'list', element: <ListPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'houses/:houseId', element: <HouseDetailPage /> },
      { path: 'saved', element: <SavedPage /> },
    ],
  },
  {
    path: '/staff/sign-in',
    element: <StaffSignInPage />,
  },
  {
    path: '*',
    element: <Navigate to="/list" replace />,
  },
]);

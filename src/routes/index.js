import React from 'react';
import { useRoutes } from 'react-router-dom';

/** Pages */
import Dashboard from '../pages/Dashboard';
import UserDetails from '../pages/UserDetails';

const RoutesComponent = () =>
  useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: '/user/:userId', element: <UserDetails /> },
    { path: '/user', element: <UserDetails />, exact: true }
  ]);

export default RoutesComponent;

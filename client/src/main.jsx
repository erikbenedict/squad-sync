import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import { CurrentUserProvider } from './context';

import App from './App';
import Error from './pages/Error';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';

import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="groupPage/:id"
        element={
          // <ProtectedRoute>
          <GroupPage />
          // </ProtectedRoute>
        }
      />
      <Route
        path="taskPage/:id"
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </CookiesProvider>
  </React.StrictMode>
);

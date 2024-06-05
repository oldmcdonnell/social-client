import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

// project styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import App from './App';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context';

const Protected = ({ component }) => {
  const { accessToken } = useContext(AuthContext);
  console.log('protected auth state ', accessToken);
  return accessToken ? (
    <>
      {component}
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Protected component={<App />} />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
]);

const AuthProvider = ({ children }) => {
  const tempToken = JSON.parse(localStorage.getItem('token'));
  const [accessToken, setAccessToken] = useState(tempToken || "");

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("token", JSON.stringify(accessToken));
    } else {
      localStorage.removeItem("token");
    }
  }, [accessToken]);

  const auth = {
    accessToken,
    setAccessToken 
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
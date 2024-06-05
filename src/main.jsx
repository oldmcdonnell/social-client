import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useEffect, useContext } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App'
import ErrorPage from './ErrorPage'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import { AuthContext } from './context'


const Protected = ({ component }) => {
  const { auth } = useContext(AuthContext);
  console.log('protected auth state ', auth);
  return auth?.accessToken ? (
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
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Protected component={<App />} />
        // element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])

// const AuthContextProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(undefined)
  
//   const auth = {
//     accessToken,
//     setAccessToken,
//   }

//   return(
//     <AuthContext.Provider value={{ auth: auth }} >
//       {children}
//     </AuthContext.Provider>
//   )
// }

const AuthContextProvider = ({ children }) => {
  let tempToken = JSON.parse(localStorage.getItem('token'))
  
  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : "")

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
  }, [accessToken])

  const auth = {
    accessToken,
    setAccessToken
  }

  return (
    <AuthContext.Provider value ={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)

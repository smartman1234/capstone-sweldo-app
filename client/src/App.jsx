import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

import Layout from './components/layouts/Layout'

import AdminDashboard from './pages/admin/admin_dashboard'
import Employee from './pages/admin/employee'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  // User
  // Admin
  {
    element: <Layout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      },
      {
        path: '/admin/employee',
        element: <Employee />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

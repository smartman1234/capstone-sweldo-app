import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

import Layout from './components/layouts/Layout'

import AdminDashboard from './pages/admin/admin_dashboard'
import Employee from './pages/admin/employee'
import Department from './pages/admin/department'

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
      },
      {
        path: '/admin/department',
        element: <Department />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

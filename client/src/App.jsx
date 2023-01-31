import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

import Layout from './components/layouts/Layout'

import AdminDashboard from './pages/admin/admin_dashboard'
import Employee from './pages/admin/employee'
import Department from './pages/admin/department'
import Job from './pages/admin/job'
import Leave from './pages/admin/leave'
import Payroll from './pages/admin/payroll'

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
      },
      {
        path: '/admin/job',
        element: <Job />
      },
      {
        path: '/admin/leave',
        element: <Leave />
      },
      {
        path: '/admin/payroll',
        element: <Payroll />
      },
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

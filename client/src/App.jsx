import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

import Layout from './components/layouts/Layout'

// User
import Dashboard from './pages/user/dashboard'
import Calendar from './pages/user/calendar'

// Admin
import AdminDashboard from './pages/admin/admin_dashboard'
import Employee from './pages/admin/employee'
import Department from './pages/admin/department'
import Job from './pages/admin/job'
import Leave from './pages/admin/leave'
import Payroll from './pages/admin/payroll'
import AdminCalendar from './pages/admin/calendar'

// 404
import PageNotFound from './pages/404'
import SalaryHistory from './pages/user/salary_history'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      /*
        User
      */
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/salary-history',
        element: <SalaryHistory />,
      },
      /*
        Admin
      */
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/calendar',
        element: <AdminCalendar />,
      },
      {
        path: '/admin/employee',
        element: <Employee />,
      },
      {
        path: '/admin/department',
        element: <Department />,
      },
      {
        path: '/admin/job',
        element: <Job />,
      },
      {
        path: '/admin/leave',
        element: <Leave />,
      },
      {
        path: '/admin/payroll',
        element: <Payroll />,
      },
    ],
  },
  // 404
  {
    path: '*',
    element: <PageNotFound />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

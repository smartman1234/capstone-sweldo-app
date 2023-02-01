import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

// Layouts
import UserLayout from './components/layouts/UserLayout'
import AdminLayout from './components/layouts/AdminLayout'

// User
import UserDashboard from './pages/user/dashboard'
import Calendar from './pages/user/calendar'
import SalaryHistory from './pages/user/salary_history'
import Profile from './pages/user/profile'
import Settings from './pages/user/settings'

// Admin
import AdminDashboard from './pages/admin/admin_dashboard'
import AdminCalendar from './pages/admin/calendar'
import Employee from './pages/admin/employee'
import Department from './pages/admin/department'
import Job from './pages/admin/job'
import Leave from './pages/admin/leave'
import Payroll from './pages/admin/payroll'
import AdminProfile from './pages/admin/admin_profile'
import AdminSettings from './pages/admin/admin_settings'

// 404
import PageNotFound from './pages/404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'user',
    element: <UserLayout />,
    children: [
      /*
        User
      */
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'salary-history',
        element: <SalaryHistory />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  /*
    Admin
  */
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'calendar',
        element: <AdminCalendar />,
      },
      {
        path: 'employee',
        element: <Employee />,
      },
      {
        path: 'department',
        element: <Department />,
      },
      {
        path: 'job',
        element: <Job />,
      },
      {
        path: 'leave',
        element: <Leave />,
      },
      {
        path: 'payroll',
        element: <Payroll />,
      },
      {
        path: 'profile',
        element: <AdminProfile />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
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

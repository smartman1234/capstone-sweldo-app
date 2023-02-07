import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Main
import Login from './pages/login'
import Payslip from './pages/payslip'

// Layouts
import UserLayout from './components/layouts/UserLayout'
import AdminLayout from './components/layouts/AdminLayout'

// User
import UserDashboard from './pages/user/dashboard'
import Attendance from './pages/user/attendance'
import Calendar from './pages/user/calendar'
import Leave from './pages/user/leave'
import SalaryHistory from './pages/user/salary_history'
import Profile from './pages/user/profile'
import Settings from './pages/user/settings'

// Admin
import AdminDashboard from './pages/admin/admin_dashboard'
import Employee from './pages/admin/employee'
import AdminAttendance from './pages/admin/admin_attendance'
import Department from './pages/admin/department'
import Job from './pages/admin/job'
import Deduction from './pages/admin/deduction'
import AdminLeave from './pages/admin/admin_leave'
import Payroll from './pages/admin/payroll'
import AdminProfile from './pages/admin/admin_profile'
import AdminSettings from './pages/admin/admin_settings'

// 404
import PageNotFound from './pages/404'

// Toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'leave',
        element: <Leave />,
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
        path: 'attendance',
        element: <AdminAttendance />,
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
        path: 'deduction',
        element: <Deduction />,
      },
      {
        path: 'leave',
        element: <AdminLeave />,
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
  {
    path: 'payslip',
    element: <Payslip />,
  },
  // 404
  {
    path: '*',
    element: <PageNotFound />,
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

export default App

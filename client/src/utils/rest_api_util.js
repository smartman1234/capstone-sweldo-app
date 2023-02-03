const baseUrl = process.env.REACT_APP_BASE_URL

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// Login
export const login = async (data) =>
  await fetch(baseUrl + '/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

/*
  User
*/

// Dashboard
export const getDashboardStats = async () =>
  await fetch(baseUrl + '/user/dashboard', {
    method: 'GET',
    headers: getHeaders(),
  })

// Attendance
export const clockIn = async () =>
  await fetch(baseUrl + '/user/attendance/clock-in', {
    method: 'POST',
    headers: getHeaders(),
  })
export const clockOut = async () =>
  await fetch(baseUrl + '/user/attendance/clock-out', {
    method: 'POST',
    headers: getHeaders(),
  })
export const getAttendanceOverview = async () =>
  await fetch(baseUrl + '/user/attendance/overview', {
    method: 'GET',
    headers: getHeaders(),
  })

// Calendar
export const getMonthlyTasks = async (timestamp) =>
  await fetch(baseUrl + `/user/task/monthly/${timestamp}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const getDailyTasks = async (timestamp) =>
  await fetch(baseUrl + `/user/task/daily/${timestamp}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addTask = async (data) =>
  await fetch(baseUrl + '/user/task', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const deleteTask = async (id) =>
  await fetch(baseUrl + `/user/task/${id}/delete`, {
    method: 'POST',
    headers: getHeaders(),
  })

// Leave
export const getLeaves = async (page) =>
  await fetch(baseUrl + `/user/leave?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addLeave = async (data) =>
  await fetch(baseUrl + '/user/leave', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

// Salary history
export const getSalaryHistory = async (page) =>
  await fetch(baseUrl + `/user/salary-history?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })

// Profile
export const getProfile = async () =>
  await fetch(baseUrl + '/user/profile', {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateProfile = async (data) =>
  await fetch(baseUrl + '/user/profile', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

// Settings
export const updateSettings = async (data) =>
  await fetch(baseUrl + '/user/settings', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

/*
  Admin
*/

// Dashboard
export const getAdminDashboardStats = async () =>
  await fetch(baseUrl + '/admin/dashboard', {
    method: 'GET',
    headers: getHeaders(),
  })

// Employee
export const getEmployees = async (page) =>
  await fetch(baseUrl + `/admin/employee?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchEmployees = async (name, page) =>
  await fetch(baseUrl + `/admin/employee?name=${name}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addEmployee = async (data) =>
  await fetch(baseUrl + '/admin/employee', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const getEmployee = async (id) =>
  await fetch(baseUrl + `/admin/employee/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateEmployee = async (id, data) =>
  await fetch(baseUrl + `/admin/employee/${id}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

// Department
export const getDepartments = async (page) =>
  await fetch(baseUrl + `/admin/department?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchDepartments = async (name, page) =>
  await fetch(baseUrl + `/admin/department?name=${name}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addDepartment = async (data) =>
  await fetch(baseUrl + '/admin/department', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const getDepartment = async (id) =>
  await fetch(baseUrl + `/admin/department/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateDepartment = async (id, data) =>
  await fetch(baseUrl + `/admin/department/${id}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const deleteDepartment = async (id) =>
  await fetch(baseUrl + `/admin/department/${id}/destroy`, {
    method: 'POST',
    headers: getHeaders(),
  })

// Job
export const getJobs = async (page) =>
  await fetch(baseUrl + `/admin/job?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchJobs = async (name, page) =>
  await fetch(baseUrl + `/admin/job?name=${name}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addJob = async (data) =>
  await fetch(baseUrl + '/admin/job', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const getJob = async (id) =>
  await fetch(baseUrl + `/admin/job/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateJob = async (id, data) =>
  await fetch(baseUrl + `/admin/job/${id}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const deleteJob = async (id) =>
  await fetch(baseUrl + `/admin/job/${id}/destroy`, {
    method: 'POST',
    headers: getHeaders(),
  })

// Deduction
export const getDeductions = async (page) =>
  await fetch(baseUrl + `/admin/deduction?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchDeductions = async (name, page) =>
  await fetch(baseUrl + `/admin/deduction?name=${name}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const addDeduction = async (data) =>
  await fetch(baseUrl + '/admin/deduction', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const getDeduction = async (id) =>
  await fetch(baseUrl + `/admin/deduction/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateDeduction = async (id, data) =>
  await fetch(baseUrl + `/admin/deduction/${id}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
export const deleteDeduction = async (id) =>
  await fetch(baseUrl + `/admin/deduction/${id}/destroy`, {
    method: 'POST',
    headers: getHeaders(),
  })

// Leave
export const getAdminLeaves = async (page) =>
  await fetch(baseUrl + `/admin/leave?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchAdminLeaves = async (name, page) =>
  await fetch(baseUrl + `/admin/leave?name=${name}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const approveLeave = async (id) =>
  await fetch(baseUrl + `/admin/leave/${id}/approve`, {
    method: 'POST',
    headers: getHeaders(),
  })
export const declineLeave = async (id) =>
  await fetch(baseUrl + `/admin/leave/${id}/decline`, {
    method: 'POST',
    headers: getHeaders(),
  })

// Payroll
export const getPayrolls = async (timestamp, page) =>
  await fetch(baseUrl + `/admin/payroll?timestamp=${timestamp}&page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const generatePayslips = async (timestamp) =>
  await fetch(
    baseUrl + `/admin/payroll/generate-payslips?timestamp=${timestamp}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  )
export const getPayslips = async (timestamp) =>
  await fetch(baseUrl + `/admin/payroll/payslips?timestamp=${timestamp}`, {
    method: 'GET',
    headers: getHeaders(),
  })

// Profile
export const getAdminProfile = async () =>
  await fetch(baseUrl + '/admin/profile', {
    method: 'GET',
    headers: getHeaders(),
  })
export const updateAdminProfile = async (data) =>
  await fetch(baseUrl + '/admin/profile', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

// Settings
export const updateAdminSettings = async (data) =>
  await fetch(baseUrl + '/admin/settings', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })

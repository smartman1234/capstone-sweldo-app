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
export const getDepartments = async () =>
  await fetch(baseUrl + '/admin/department', {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchDepartments = async (name, page) =>
  await fetch(baseUrl + `/admin/job?name=${name}&page=${page}`, {
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

// Job
export const getJobs = async () =>
  await fetch(baseUrl + '/admin/job', {
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

// Leave
export const getLeaves = async (page) =>
  await fetch(baseUrl + `/admin/leave?page=${page}`, {
    method: 'GET',
    headers: getHeaders(),
  })
export const searchLeaves = async (name, page) =>
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

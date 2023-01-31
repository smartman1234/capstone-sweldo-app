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

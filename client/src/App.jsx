import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

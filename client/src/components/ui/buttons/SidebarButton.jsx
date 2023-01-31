import { NavLink } from 'react-router-dom'

const SidebarButton = ({ name, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'bg-blue-600 w-full text-white font-medium px-5 py-2.5 rounded'
          : 'w-full text-black font-medium px-5 py-2.5 rounded hover:bg-blue-600 hover:text-white'
      }
    >
      {name}
    </NavLink>
  )
}

export default SidebarButton

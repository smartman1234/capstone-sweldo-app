import { NavLink } from 'react-router-dom'

const SidebarButton = ({ name, to }) => {
  return (
    <NavLink to={to} className='sidebarBtn'>
      {name}
    </NavLink>
  )
}

export default SidebarButton

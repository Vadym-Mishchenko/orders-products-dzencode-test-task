import { NavLink } from 'react-router-dom';
import { navItems } from '../config';
import { FaCog, FaUserCircle } from 'react-icons/fa';
import './Sidebar.css';

export const Sidebar = () => {
  return (
    <aside className="sidebar bg-light d-flex flex-column py-4 shadow-sm overflow-hidden">
      <div className="sidebar__avatar mb-4 text-center position-relative d-inline-block">
        <FaUserCircle className="sidebar__avatar-icon" />
        <NavLink to="/user">
          <FaCog className="sidebar__settings-icon" />
        </NavLink>
      </div>

      <nav className="sidebar__nav nav flex-column">
        {navItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className="sidebar__link">
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

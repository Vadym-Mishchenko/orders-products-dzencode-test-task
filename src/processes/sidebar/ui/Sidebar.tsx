import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavItems } from '../config';
import { FaCog, FaUserCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const STORAGE_KEY = 'appLanguage';

export const Sidebar = () => {
  const { i18n } = useTranslation();
  const navItems = useNavItems();

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <aside className="sidebar bg-light d-flex flex-column py-4 shadow-lg overflow-hidden">
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

        <div className="mt-3 px-3">
          <select
            className="form-select form-select-sm"
            onChange={handleLanguageChange}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="uk">Українська</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </nav>
    </aside>
  );
};

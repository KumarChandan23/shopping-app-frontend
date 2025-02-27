import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import ShopIcon from '@mui/icons-material/Shop';

const Navbar = () => {
  return (
    <nav id={style.navbar_container}>
      <ShopIcon sx={{ fontSize: 40 }} />
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.active : style.nav_item)}>
            home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? style.active : style.nav_item)}>
            login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? style.active : style.nav_item)}>
            signup
          </NavLink>
        </li>
        <li>
          <NavLink to="/update" className={({ isActive }) => (isActive ? style.active : style.nav_item)}>
            update
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

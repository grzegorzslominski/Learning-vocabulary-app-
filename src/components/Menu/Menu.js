/* eslint-disable func-names */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import style from './Menu.module.css';
import useAuth from '../../hooks/useAuth';

const Menu = function () {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  return (
    <div className={`${style.menuContainer} breadcrumb`}>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <NavLink exact to="/" activeClassName={style.menuItemActive}>
            Home
          </NavLink>
        </li>
        {auth ? (
          <>
            <li className={style.menuItem}>
              <a href="#" onClick={logout}>
                Log out
              </a>
            </li>
            <li className={style.menuItem}>
              <NavLink to="/add" activeClassName={style.menuItemActive}>
                Add words
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink to="/show" activeClassName={style.menuItemActive}>
                Show words
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink to="/learning" activeClassName={style.menuItemActive}>
                Start learning
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={style.menuItem}>
              <NavLink activeClassName={style.menuItemActive} to="/register">
                Register
              </NavLink>
            </li>
            <li className={style.menuItem}>
              <NavLink to="/login" activeClassName={style.menuItemActive}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;

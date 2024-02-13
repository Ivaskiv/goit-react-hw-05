import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';

const makeClassName = ({ isActive }) => `${css.link} ${isActive ? css.activeLink : ''}`;

const Navbar = () => {
  return (
    <nav>
      <div className={css.nav}>
        <NavLink className={makeClassName} to="/">
          HOME
        </NavLink>
        <NavLink className={makeClassName} to="/movies">
          MOVIES
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;

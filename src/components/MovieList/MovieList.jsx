import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export const MovieListItem = ({ id, title }) => {
  return (
    <li key={id} className={css.li}>
      <Link to={`/movies/${id}`}>{title}</Link>
    </li>
  );
};

export const MovieList = ({ children }) => {
  return <ul className={css.list}>{children}</ul>;
};

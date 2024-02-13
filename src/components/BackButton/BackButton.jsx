import { IoChevronBackSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import css from './BackButton.module.css';

export default function BackButton({ className }) {
  const { state } = useLocation();
  return (
    <Link to={state?.from ?? '/'} className={`${css.goBackLink} ${className ?? ''}`}>
      <IoChevronBackSharp />
      Go back
    </Link>
  );
}

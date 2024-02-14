import { IoChevronBackSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import css from './BackButton.module.css';

export default function BackButton({ className }) {
  const { state } = useLocation();
  console.log(state);
  return (
    <Link to={state?.from ?? '/'} className={`${css.goBackLink} ${className ?? ''}`}>
      <IoChevronBackSharp />
      Go back
    </Link>
  );
}

import { useEffect, useState } from 'react';

import { searchMovies } from '../../api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputFilter, setInputFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const filter = searchParams.get('filter');
  const location = useLocation();
  const handleSearch = () => {
    searchParams.set('filter', inputFilter);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (!filter) {
      return;
    }
    const abortController = new AbortController();
    async function fetchData() {
      try {
        const response = await searchMovies({
          abortController,
          params: {
            query: filter,
          },
        });
        setSearchResults(response);
      } catch (error) {
        if (!abortController.signal.aborted)
          console.error('Error fetching trending movies:', error.message);
      }
    }
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [filter]);
  return (
    <div>
      <div className={css.searchContainer}>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          value={inputFilter}
          onChange={e => setInputFilter(e.target.value)}
        />
        <button className={css.searchButton} onClick={handleSearch}>
          search
        </button>
      </div>
      <ul className={css.searchResultsList}>
        {searchResults.map(movie => (
          <li key={movie.id} className={css.searchResultItem}>
            <Link
              to={{ pathname: movie.id.toString(), state: { from: location } }}
              className={css.searchResultLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

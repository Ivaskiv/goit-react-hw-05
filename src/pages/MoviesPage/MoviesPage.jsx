import { useEffect, useState } from 'react';

import { searchMovies } from '../../api';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';
import { MovieList, MovieListItem } from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputFilter, setInputFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const filter = searchParams.get('filter');
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
      <form onSubmit={handleSearch}>
        <div className={css.searchContainer}>
          <input
            type="search"
            name="filter"
            id="search-form"
            className={css.searchInput}
            value={inputFilter}
            onChange={e => setInputFilter(e.target.value)}
          />
          <button className={css.searchButton} type="submit">
            search
          </button>
        </div>
      </form>
      <MovieList>
        {searchResults.map(({ id, title }) => (
          <MovieListItem key={id} id={id} title={title} />
        ))}
      </MovieList>
    </div>
  );
}

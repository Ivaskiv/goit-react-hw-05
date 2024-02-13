import { useEffect, useState } from 'react';
import { MovieList, MovieListItem } from '../MovieList/MovieList';
import { getTrendingMovies } from '../../api';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await getTrendingMovies({
          abortController: abortController,
        });
        setTrendingMovies(response);
      } catch (error) {
        if (!abortController.signal.aborted)
          console.error('Error fetching trending movies:', error.message);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <h2>Trending today</h2>
      <MovieList>
        {trendingMovies.map(({ id, title }) => (
          <MovieListItem key={id} id={id} title={title} />
        ))}
      </MovieList>
    </div>
  );
};

export default Home;

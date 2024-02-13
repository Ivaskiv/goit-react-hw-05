import { useEffect, useState } from 'react';
import { getMovieById } from '../../api';
import { Link, Outlet, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import BackButton from '../BackButton/BackButton';
import { placeholderImageSrc } from '../../common';

const MovieDetailsPage = () => {
  const [detailsMovie, setDetailsMovie] = useState(null); // Створюємо стан для деталей фільму та функцію для їх оновлення
  const { movieId } = useParams(); // Отримуємо параметри шляху (movieId) за допомогою useParams()
  useEffect(() => {
    const abortController = new AbortController();
    const fetchMovieDetails = async () => {
      // Визначаємо асинхронну функцію для отримання деталей фільму
      try {
        const response = await getMovieById(movieId); // Визначаємо асинхронну функцію для отримання деталей фільму
        setDetailsMovie(response); // Оновлюємо стан detailsMovie із отриманими даними
      } catch (error) {
        console.error('Error fetching trending movies:', error.message);
      }
    };
    fetchMovieDetails();
    return () => {
      abortController.abort();
    };
  }, [movieId]);
  const getImgUrl = (filePath, size = 'w500') => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    return `${baseUrl}${size}${filePath}`;
  };

  return (
    <>
      <BackButton />
      <div className={css.movieDetailContainer}>
        {detailsMovie ? (
          <>
            <img
              src={
                detailsMovie.poster_path ? getImgUrl(detailsMovie.poster_path) : placeholderImageSrc
              }
              alt={detailsMovie.title}
              className={css.moviePoster}
            />

            <div className={css.movieDetails}>
              <h1>{detailsMovie.original_title}</h1>
              <p className={css.movieDetailsData}>User Score: {detailsMovie.vote_average}</p>
              <h3>Overview:</h3>
              <p className={css.movieDetailsData}>{detailsMovie.overview}</p>
              {detailsMovie.genres && (
                <ul className={css.genreItems}>
                  <h3>Genres:</h3>
                  {detailsMovie.genres.map(genre => (
                    <li key={genre.id} className={css.genreItem}>
                      <p className={css.movieDetailsData}>{genre.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : null}
      </div>
      <hr />
      <ul className={css.creditsReviewsItems}>
        <li className={css.creditsReviewsItem}>
          <Link to="cast">Cast</Link>
        </li>
        <li className={css.creditsReviewsItem}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;

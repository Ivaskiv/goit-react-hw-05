//https://api.themoviedb.org/3/movie/{movie_id}/credits

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCastById } from '../../api';
import css from './MovieCast.module.css';
import { placeholderImageSrc } from '../../common';
const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    const fetchMovieCast = async () => {
      try {
        const response = await getMovieCastById(movieId);
        setMovieCast(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchMovieCast();
    return () => {
      abortController.abort();
    };
  }, [movieId]);
  const getImgUrl = (profile_path, size = 'w200') => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    return `${baseUrl}${size}${profile_path}`;
  };

  return (
    <div>
      {movieCast.length > 0 ? (
        <ul className={css.castItems}>
          {movieCast.map(data => (
            <li key={`${data.id}-${data.character}`} className={css.castItem}>
              <img
                src={data.profile_path ? getImgUrl(data.profile_path) : placeholderImageSrc}
                alt={data.name}
                className={css.profilePath}
              />
              <div className={css.cardData}>
                <p className={css.cardDataName}>{data.name}</p>
                <p>
                  <span>Character: </span>
                  {data.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movie cast found</p>
      )}
    </div>
  );
};
export default MovieCast;

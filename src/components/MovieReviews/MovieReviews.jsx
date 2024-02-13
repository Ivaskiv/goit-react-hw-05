// MovieReviews.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviewsById } from '../../api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviewsById(movieId);
        setMovieReviews(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      {movieReviews.length > 0 ? (
        <ul className={css.reviewsItems}>
          {movieReviews.map(review => (
            <li key={review.id} className={css.reviewsItem}>
              <div className={css.reviewerName}>{review.author_details.username}</div>{' '}
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No movie reviews found</p>
      )}
    </div>
  );
};

export default MovieReviews;

import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const setApiToken = apiToken => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
};
setApiToken(
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGUxMDBkMWM2ODRlMDc1YThkOGRlYTg4NTBlMmI1MiIsInN1YiI6IjY1YzNmZDRhMDEwMmM5MDE2MzUwMjRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGCk0M3T9ekOam0gpg1R3X1U_vKwZXndcKvLytx9KBU'
);

export const getTrendingMovies = async ({ abortController, timeWindow = 'day' }) => {
  const response = await axios.get(`/3/trending/movie/${timeWindow}`, {
    signal: abortController.signal,
  });
  return response.data.results;
};

export const searchMovies = async ({ abortController, params }) => {
  const response = await axios.get('/3/search/movie', {
    signal: abortController.signal,
    params,
  });
  return response.data.results;
};

export const getMovieById = async id => {
  try {
    const response = await axios.get(`/3/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('ERROR', error.message);
  }
};

export const getMovieCastById = async id => {
  try {
    const response = await axios.get(`/3/movie/${id}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('ERROR', error.message);
  }
};

export const getMovieReviewsById = async id => {
  try {
    const response = await axios.get(`/3/movie/${id}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('ERROR', error.message);
  }
};

// Ключ API
// fde100d1c684e075a8d8dea8850e2b52
// Токен доступу для читання API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGUxMDBkMWM2ODRlMDc1YThkOGRlYTg4NTBlMmI1MiIsInN1YiI6IjY1YzNmZDRhMDEwMmM5MDE2MzUwMjRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGCk0M3T9ekOam0gpg1R3X1U_vKwZXndcKvLytx9KBU

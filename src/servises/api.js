import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '24332f5bdb5cb6313d5fde27ff166678';

const fetchMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${KEY}`
  );
  return response.data.results;
};

const fetchMoviesForQuery = async value => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${value}`
  );
  return response.data.results;
};

const fetchMovieDetail = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}`
  );
  return response.data;
};

const fetchMovieCast = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`
  );
  return response.data.cast;
};

const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`
  );
  return response.data.results;
};

export {
  fetchMovies,
  fetchMoviesForQuery,
  fetchMovieDetail,
  fetchMovieCast,
  fetchMovieReviews,
};

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY } from '../servises/api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const Reviews = () => {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getMovieReviews() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`
        );
        setMovieReviews(response.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        Loading.remove();
      }
    }
    getMovieReviews();
  }, [movieId]);

  loading && Loading.standard('Loading...');

  error &&
    Notify.failure('Oops! Something went wrong. Please try reloading the page');

  if (!movieReviews) {
    return;
  }

  if (movieReviews.length === 0) {
    return <h3>We don't have any weriews for this movie</h3>;
  }

  return (
    <ul>
      {movieReviews.map(({ id, content, author }) => (
        <li key={id}>
          <h3>Author: {author}</h3>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY } from '../servises/api.js';

const Reviews = () => {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState();

  useEffect(() => {
    async function getMovieReviews() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`
        );
        setMovieReviews(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieReviews();
  }, [movieId]);

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

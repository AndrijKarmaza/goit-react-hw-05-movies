import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../servises/api.js';
import avatarCasts from '../../images/avatar_casts.png';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const Cast = () => {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getMovieCast() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`
        );
        setMovieCast(response.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        Loading.remove();
      }
    }
    getMovieCast();
  }, [movieId]);

  loading && Loading.standard('Loading...');

  error &&
    Notify.failure('Oops! Something went wrong. Please try reloading the page');

  if (!movieCast || error) {
    return;
  }

  return (
    <ul>
      {movieCast.map(({ profile_path, name, character, id }) => (
        <li key={id}>
          <img
            src={profile_path ? `${BASE_IMG_URL}${profile_path}` : avatarCasts}
            alt={name}
          />
          <h2>{name}</h2>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;

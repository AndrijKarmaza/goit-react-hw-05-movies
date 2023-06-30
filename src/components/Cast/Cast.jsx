import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../servises/api.js';
import avatarCasts from '../../images/avatar_casts.png';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import css from './Cast.module.css';

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
    <ul className={css.cast_list}>
      {movieCast.map(({ profile_path, name, character, id }) => (
        <li key={id} className={css.cast_list_item}>
          <img
            src={profile_path ? `${BASE_IMG_URL}${profile_path}` : avatarCasts}
            alt={name}
            className={css.cast_img}
          />
          <h2>{name}</h2>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;

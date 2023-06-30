import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../servises/api.js';
import avatarCasts from '../../images/avatar_casts.png';

const Cast = () => {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState();

  useEffect(() => {
    async function getMovieCast() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`
        );
        setMovieCast(response.data.cast);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieCast();
  }, [movieId]);

  if (!movieCast) {
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

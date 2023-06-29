import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_TOPLIST_URL, KEY, BASE_IMG_URL } from '../servises/api.js';

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState();

  useEffect(() => {
    async function getMovieData() {
      try {
        const response = await axios.get(
          `${BASE_TOPLIST_URL}/movie/${movieId}?api_key=${KEY}`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieData();
  }, [movieId]);

  if (!movieData) {
    return;
  }

  const { poster_path, title, vote_average, overview, genres } = movieData;
  const genresList = genres.flatMap(genre => genre.name).join(', ');

  return (
    <>
      <img src={`${BASE_IMG_URL}${poster_path}`} alt={title} />
      <h1>{title}</h1>
      <p>User Score: {(vote_average * 10).toFixed(0)}%</p>
      <h2>Genres:</h2>
      <p>{genresList}</p>
      <h2>Overview:</h2>
      <p>{overview}</p>
    </>
  );
};

export default MovieDetails;

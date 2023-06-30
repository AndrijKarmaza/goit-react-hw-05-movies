import axios from 'axios';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { BASE_URL, KEY, BASE_IMG_URL } from '../servises/api.js';
import moviePoster from '../../images/movie-poster.png';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backWay = location.state?.from ?? '/';

  useEffect(() => {
    setLoading(true);
    async function getMovieData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}?api_key=${KEY}`
        );
        setMovieData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        Loading.remove();
      }
    }
    getMovieData();
  }, [movieId]);

  loading && Loading.standard('Loading...');

  error &&
    Notify.failure('Oops! Something went wrong. Please try reloading the page');

  if (!movieData || error) {
    return <Link to={backWay}>Back</Link>;
  }

  const { poster_path, title, vote_average, overview, genres } = movieData;
  const genresList = genres.flatMap(genre => genre.name).join(', ');

  return (
    <>
      <Link to={backWay}>Back</Link>
      <div>
        <img
          src={poster_path ? `${BASE_IMG_URL}${poster_path}` : moviePoster}
          alt={title}
        />
        <h1>{title}</h1>
        <p>User Score: {(vote_average * 10).toFixed(0)}%</p>
        <h2>Genres:</h2>
        <p>{genresList}</p>
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div>
      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;

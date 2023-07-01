import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMovies } from '../../servises/api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import moviePoster from '../../images/movie-poster.png';
import css from './Home.module.css';

const Home = () => {
  const [topList, setTopList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    async function getToplist() {
      try {
        const response = await fetchMovies();
        setTopList(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        Loading.remove();
      }
    }
    getToplist();
  }, []);

  loading && Loading.standard('Loading...');

  error &&
    Notify.failure('Oops! Something went wrong. Please try reloading the page');

  return (
    <>
      <h1>Weekly movie trends</h1>
      <ul className={css.movie_list}>
        {topList.map(({ poster_path, title, name, id }) => (
          <Link key={id} to={`/movies/${id}`} state={{ from: location }}>
            <li key={id} className={css.gallery_item}>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w300${poster_path}`
                    : moviePoster
                }
                alt={title}
                loading="lazy"
              />
              <h2>{title}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Home;

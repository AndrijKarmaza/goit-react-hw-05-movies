import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../../components/servises/api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
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
        const response = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${KEY}`
        );
        const { results } = response.data;
        setTopList(results);
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
                src={`${BASE_IMG_URL}${poster_path}`}
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

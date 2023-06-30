import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../../components/servises/api.js';
import moviePoster from '../../images/movie-poster.png';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import css from './Movies.module.css';

const Movies = () => {
  const [movieList, setMovieList] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('value');
  const location = useLocation();

  useEffect(() => {
    if (!value) {
      return;
    } else {
      setLoading(true);
      async function getMovieList() {
        try {
          const response = await axios.get(
            `${BASE_URL}/search/movie?api_key=${KEY}&query=${value}`
          );
          setMovieList(response.data.results);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
          Loading.remove();
        }
      }
      getMovieList();
    }
  }, [value]);

  loading && Loading.standard('Loading...');

  error &&
    Notify.failure('Oops! Something went wrong. Please try reloading the page');

  function onFormSubmit(evt) {
    evt.preventDefault();
    const { value } = evt.currentTarget.elements.value;
    value.trim() === ''
      ? Notify.failure('Enter the name of the movie')
      : setSearchParams({ value: value.trim() });
    evt.currentTarget.reset();
  }
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="value"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          className={css.search_input}
        />
        <button type="submit" className={css.search_btn}>
          Search
        </button>
      </form>
      {movieList && (
        <ul className={css.movie_list}>
          {movieList.map(({ poster_path, title, id }) => (
            <Link key={id} to={`${id}`} state={{ from: location }}>
              <li key={id} className={css.gallery_item}>
                <img
                  src={
                    poster_path ? `${BASE_IMG_URL}${poster_path}` : moviePoster
                  }
                  alt={title}
                />
                <h2>{title}</h2>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;

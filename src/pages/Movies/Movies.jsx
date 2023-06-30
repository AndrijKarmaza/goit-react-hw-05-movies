import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../../components/servises/api.js';
import moviePoster from '../../images/movie-poster.png';
import axios from 'axios';

const Movies = () => {
  const [movieList, setMovieList] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('value');
  const location = useLocation();

  useEffect(() => {
    if (!value) {
      return;
    } else {
      async function getMovieList() {
        try {
          const response = await axios.get(
            `${BASE_URL}/search/movie?api_key=${KEY}&query=${value}`
          );
          setMovieList(response.data.results);
        } catch (error) {
          console.error(error);
        }
      }
      getMovieList();
    }
  }, [value]);

  function onFormSubmit(evt) {
    evt.preventDefault();
    const { value } = evt.currentTarget.elements.value;
    setSearchParams({ value });
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
        />
        <button type="submit">Search</button>
      </form>
      {movieList && (
        <ul>
          {movieList.map(({ poster_path, title, id }) => (
            <Link key={id} to={`${id}`} state={{ from: location }}>
              <li key={id}>
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

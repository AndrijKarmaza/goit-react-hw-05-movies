import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL, KEY, BASE_IMG_URL } from '../../components/servises/api.js';

const Home = () => {
  const [topList, setTopList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function getToplist() {
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${KEY}`
        );
        const { results } = response.data;
        setTopList(results);
      } catch (error) {
        console.error(error);
      }
    }
    getToplist();
  }, []);

  return (
    <>
      <h1>Weekly movie trends</h1>
      <ul>
        {topList.map(({ poster_path, title, name, id }) => (
          <Link key={id} to={`/movies/${id}`} state={{ from: location }}>
            <li key={id}>
              <img src={`${BASE_IMG_URL}${poster_path}`} alt={title} />
              <h2>{title}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Home;

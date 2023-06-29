import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BASE_TOPLIST_URL,
  KEY,
  BASE_IMG_URL,
} from '../../components/servises/api.js';

const Home = () => {
  const [topList, setTopList] = useState([]);

  useEffect(() => {
    async function getToplist() {
      try {
        const response = await axios.get(
          `${BASE_TOPLIST_URL}/trending/all/week?api_key=${KEY}`
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
    <ul>
      {topList.map(({ poster_path, title, name, id }) => (
        <Link key={id} to={`/movies/${id}`}>
          <li key={id}>
            <img src={`${BASE_IMG_URL}${poster_path}`} alt={title ?? name} />
            <h2>{title ?? name}</h2>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Home;

import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <p>404</p>
      <h1>Page not found</h1>
      <h2>Oops! Something is wrong</h2>
      <Link to={'/'}>Back to homepage</Link>
    </div>
  );
};

export default Error;

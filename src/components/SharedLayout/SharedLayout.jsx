import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul className={css.navigation}>
            <li>
              <NavLink to="/" end className={css.nav_link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={css.nav_link}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={css.container}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default SharedLayout;

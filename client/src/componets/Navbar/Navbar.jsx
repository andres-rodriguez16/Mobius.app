import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVideoGames } from '../../redux/actions/action';
import s from './Navbar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  return (
    <header className={s.container}>
      <nav className={s.navbar}>
        <Link to='/' className={s.header__title}>
          Möbius
        </Link>
        <section className={s['navbar--section']}>
          <ul className={s['navbar--section__container']}>
            <li >
              <Link>About</Link>
            </li>
            <li>
              <Link to='/home'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/createVideogame'>
                Create
              </Link>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default NavBar;

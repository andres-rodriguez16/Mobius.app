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
    <header className={s.navBar}>
      <h1 className={s.header__title}>Möbius</h1>
      <nav>
        <ul className={s.list}>
          <li >
            <Link to='/'>
              <button>Intro</button>
            </Link>
          </li>
          <li>
            <Link to='/createVideogame'>
              <button>Create</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

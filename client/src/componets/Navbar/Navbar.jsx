import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getVideoGames } from '../../redux/actions/action';
import Search from '../Search/Search';

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
  }

  return (
    <header className='navBar'>
      <h1>VideoGames</h1>
      <nav>
        <ul className='list'>
          <li className='list-item'>
            <Link to='/'>Intro</Link>
            <Link to='/createVideogame'>Create</Link>
          </li>
        </ul>
      </nav>
      <div>
        <select>
          <option value='asc'>asc</option>
          <option value='desc'>desc</option>
        </select>
        <select>
          <option value='a-z'>a-z</option>
          <option value='z-a'>z-a</option>
        </select>
      </div>
    </header>
  );
};

export default NavBar;

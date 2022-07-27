import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVideoGames} from '../../redux/actions/action';


const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]); 
   
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
    </header>
  );
};

export default NavBar;

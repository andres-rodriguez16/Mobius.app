import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getVideoGamePorSearch } from '../../redux/actions/action';
import s from './Search.module.css';
import { HiSearch } from 'react-icons/hi';

const Search = ({ setActualPage }) => {
  const [name, setName] = useState('');
  const dispacth = useDispatch();

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert('Debe ingresar algo');
    }
    dispacth(getVideoGamePorSearch(name));
    setActualPage(1);
    setName('');
  }

  return (
    <div>
      <div className={s.Search}>
        <input
          className={s.input__search}
          value={name}
          type='text'
          id='title'
          autoComplete='off'
          placeholder='buscar...'
          onChange={e => handleInputChange(e)}
        />
        <button
          type='submit'
          onClick={e => handleSubmit(e)}
          className={s.buttom__search}
        >
          <HiSearch
            style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Search;

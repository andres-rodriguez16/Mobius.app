import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getVideoGamePorSearch } from '../../redux/actions/action';
import s from './Search.module.css';
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
      <form>
        <div className={s.Search}>
          <label className='label' htmlFor='title'></label>
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
            BUSCAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

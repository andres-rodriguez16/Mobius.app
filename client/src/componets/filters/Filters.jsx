import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Filters.module.css';
import {
  getGenres,
  ordenPorGames,
  filtroPorGenero,
  ratingSort,
  filtroPorAlpha,
  ordenFecha
} from '../../redux/actions/action';

export default function Filters({setActualPage}) {


  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  function handleOnGames(e) {
    dispatch(ordenPorGames(e.target.value));
    setActualPage(1)
  }

  function handleFiltroPorGenro(e) {
    dispatch(filtroPorGenero(e.target.value));
    setActualPage(1);
  }

  function handleFiltroPorRating(e) {
    dispatch(ratingSort(e.target.value));
    setActualPage(1)
  }
  function handleFiltroPorAlpha(e) {
    dispatch(filtroPorAlpha(e.target.value));
    setActualPage(1)
  }
  function handlerFiltroPorFecha(e) {
    dispatch(ordenFecha(e.target.value))
  }
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  return (
    <div className={style.filter}>
    <select onChange={e => handleFiltroPorRating(e)}>
      <option>Rating</option>
      <option value='asc'>Asc</option>
      <option value='desc'>Dec</option>
    </select>
    <select onChange={e => handlerFiltroPorFecha(e)}>
      <option value="fecha">Date</option>
      <option value='asc'>Asc</option>
      <option value='desc'>Dec</option>
    </select>
    <select onChange={e => handleFiltroPorAlpha(e)}>
      <option value='ordenAlpha'>Alpha</option>
      <option value='a-z'>A-Z</option>
      <option value='z-a'>Z-A</option>
    </select>
    <select onChange={e => handleOnGames(e)}>
      <option>Creating in</option>
      <option value='DB'>Datebase</option>
      <option value='Api'>Api</option>
    </select>
    <select onChange={e => handleFiltroPorGenro(e)}>
      <option value='All'>Genres</option>
      {genres.length
        ? genres.map(g => {
            return (
              <option value={g.name} key={g.id}>
                {g.name}
              </option>
            );
          })
        : []}
    </select>
  </div>
  )
}

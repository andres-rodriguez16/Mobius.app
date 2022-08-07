import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVideoGames,
  getGenres,
  ordenPorGames,
  filtroPorGenero,
  ratingSort,
  filtroPorAlpha,
  clearHome,
  ordenFecha
} from '../../redux/actions/action';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import Paginado from '../Paginado/Paginado';
import Search from '../Search/Search';
import style from './Home.module.css';
import loading from "../../img/loading-icon.gif"

const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector(state => state.videoGamesFilter);
  const genres = useSelector(state => state.genres);
  const [actualPage, setActualPage] = useState(1);
  const [videogamesPorPagina, setvideogamesPorPagina] = useState(15);
  const indeceDelUltimoVideogame = actualPage * videogamesPorPagina;
  const indeceDelPrimerVideogame = indeceDelUltimoVideogame - videogamesPorPagina;
  const actualesVideogames = videoGames?.slice(indeceDelPrimerVideogame,indeceDelUltimoVideogame);

  const paginado = numeroDePaginada => {
    setActualPage(numeroDePaginada);
  };

  useEffect(() => {
    dispatch(getVideoGames());
    dispatch(getGenres());
    return function (){
       dispatch(clearHome())
    }
  }, [dispatch]);

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
  return (
    <div className={style.home}>
      <div className={style.barras}>
      <Search setActualPage={setActualPage} />
      <div className={style.filter}>
        <select onChange={e => handleFiltroPorRating(e)}>
          <option>Rating</option>
          <option value='asc'>Ascendente</option>
          <option value='desc'>Decendente</option>
        </select>
        <select onChange={e => handlerFiltroPorFecha(e)}>
          <option value="fecha">Fecha</option>
          <option value='asc'>Ascendente</option>
          <option value='desc'>Decendente</option>
        </select>
        <select onChange={e => handleFiltroPorAlpha(e)}>
          <option value='ordenAlpha'>Alpha</option>
          <option value='a-z'>A-Z</option>
          <option value='z-a'>Z-A</option>
        </select>
        <select onChange={e => handleOnGames(e)}>
          <option>Orden</option>
          <option value='DB'>Creados</option>
          <option value='Api'>Api</option>
        </select>
        <select name='Genros' onChange={e => handleFiltroPorGenro(e)}>
          <option value='All'>Todos</option>
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
      </div>
      <Paginado
        videgames={videoGames.length}
        videogamesPorPagina={videogamesPorPagina}
        paginado={paginado}
      />
      {actualesVideogames.length ? (
        <div className={style.list__cards}>
          {actualesVideogames?.map(v => {
            return (
              <Link to={'/home/' + v.id} key={v.id}>
                <Card
                  name={v.name}
                  genres={v.Generos }
                  image={v.img }
                  key={v.id}
                  rating={v.rating}
                  released={v.released}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={style.loading}>
          <img src={loading} alt=''  />
        </div>
      )}
      
    </div>
  );
};

export default Home;

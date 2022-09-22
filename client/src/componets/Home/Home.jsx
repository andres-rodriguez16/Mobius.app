import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVideoGames,
  clearHome,
} from '../../redux/actions/action';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import Paginado from '../Paginado/Paginado';
import Search from '../Search/Search';
import style from './Home.module.css';
import loading from '../../img/loading-icon.gif';
import Filters from '../Filters/Filters';
const Home = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector(state => state.videoGamesFilter);
  const [actualPage, setActualPage] = useState(1);
  const [videogamesPorPagina, setvideogamesPorPagina] = useState(15);
  const indeceDelUltimoVideogame = actualPage * videogamesPorPagina;
  const indeceDelPrimerVideogame =
    indeceDelUltimoVideogame - videogamesPorPagina;
  const actualesVideogames = videoGames?.slice(
    indeceDelPrimerVideogame,
    indeceDelUltimoVideogame
  );

  const paginado = numeroDePaginada => {
    setActualPage(numeroDePaginada);
  };

  useEffect(() => {
    dispatch(getVideoGames());
    return function () {
      dispatch(clearHome());
    };
  }, [dispatch]);

  return (
    <div className={style.home}>
      <div className={style.barras}>
        <Search setActualPage={setActualPage} />
        <Filters setActualPage={setActualPage}/>
      </div>
      <Paginado
        videgames={videoGames.length}
        videogamesPorPagina={videogamesPorPagina}
        paginado={paginado}
        actualPage={actualPage}
      />
      {actualesVideogames.length ? (
        <div className={style.list__cards}>
          {actualesVideogames?.map(v => {
            return (
              <Link to={'/home/' + v.id} key={v.id}>
                <Card
                  name={v.name}
                  genres={v.Generos}
                  image={v.img}
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
          <img src={loading} alt='' />
        </div>
      )}
    </div>
  );
};

export default Home;

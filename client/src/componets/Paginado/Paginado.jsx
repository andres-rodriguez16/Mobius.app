import React from 'react';
import style from './Paginado.module.css';
const Paginado = ({
  videgames,
  videogamesPorPagina,
  paginado,
  nextPag,
  previusPag,
  actualPage,
  actualesVideogames,
}) => {
  return (
    <nav className={style.container}>
      {actualPage === 1 ? null : (
        <button onClick={() => previusPag()}>Previus</button>
      )}
      <p>{actualPage}</p>
      {actualesVideogames.length < 15 ? null : (
        <button onClick={() => nextPag()}>Next</button>
      )}
    </nav>
  );
};

export default Paginado;

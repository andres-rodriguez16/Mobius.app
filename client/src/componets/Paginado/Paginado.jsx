import React from 'react';
import style from './Paginado.module.css';
const Paginado = ({ videgames, videogamesPorPagina, paginado }) => {
  const numerosDePaginas = [];
  for (let i = 1; i <= Math.ceil(videgames / videogamesPorPagina); i++) {
    numerosDePaginas.push(i);
  }
  return (
    <nav>
      <ul className={style.paginado}>
        {numerosDePaginas &&
          numerosDePaginas.map(p => (
            <button className={style.number} key={p} onClick={() => paginado(p)}>
              {p}
            </button>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;

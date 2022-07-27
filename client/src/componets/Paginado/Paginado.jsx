import React from 'react';

const Paginado = ({ videgames, videogamesPorPagina, paginado }) => {
  const numerosDePaginas = [];
  for (let i = 1; i <= Math.ceil(videgames / videogamesPorPagina); i++) {
    numerosDePaginas.push(i);
  }
  return (
    <nav>
      <ul className='paginado'>
        {numerosDePaginas &&
          numerosDePaginas.map(p => (
            <button className='Number' key={p} onClick={() => paginado(p)}>
              {p}
            </button>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;

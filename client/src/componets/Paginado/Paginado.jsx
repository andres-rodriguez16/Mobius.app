import React from 'react';

const Paginado = ({ videgames, personajesPorPagina, paginado }) => {
  const numerosDePaginas = [];
  for (let i = 1; i <= Math.ceil(videgames/personajesPorPagina); i++) {
     numerosDePaginas.push(i)
  }
   
  return (
     <nav>
       <ul className='paginado'>
        {
          numerosDePaginas && numerosDePaginas.map(p => (
            <li className='Number' key={p}>
              <a onClick={() => paginado(p)}>{p}</a>
            </li> 
          ))}
       </ul>
     </nav>
  )
};

export default Paginado;

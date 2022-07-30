import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideoGame, getGenres } from '../../redux/actions/action';
import platforms from './Plataformas';

const validarNombre = {
  name: /^[A-Z0-9a-zÑñÁáÉéÍíÓóÚúÜü:\s]+$/,
};

function validation(input) {
  const errores = {};
  if (!input.name) {
    errores.name = 'no escribiste el nombre';
  }else if (!validarNombre.name.test(input.name)) {
    errores.name = 'El nombre es incorrecto';
  }
  if (!input.description) {
    errores.description = 'Este campo no puede estar vacio';
  } 
 
  if (input.genres.length === 0) {
    errores.genres = 'Este campo no puede estar vacio'
  }
  if (input.platforms.length === 0 && input.platforms.length < 1) {
    errores.platforms = 'Este campo no puede estar vacio'
  }
  return errores;
}

const Formulario = () => {
  const generos = useSelector(state => state.genres);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
  });
  
  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handlerCkeckGenros(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handlerCkeckPlataformas(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    
  }

  function handlerSubmit(e) {
    e.preventDefault();
    let encotrarID = generos.filter(g => input.genres.includes(g.name));
    encotrarID = encotrarID.map(t => t.id);
    console.log(errors)
    if (errors.name || errors.description) {
      return alert("complete los input correctamente")
    }
    if (!input.genres.length) {
      return alert("tiene que agregar generos")
   }
    if (!input.platforms.length) {
      return alert("tiene que agregar plataformas")
    }
    let postfinal = {
      name: input.name,
      description: input.description,
      released: input.released,
      rating: Number(input.rating),
      genres: encotrarID,
      platforms: input.platforms,
    };
    dispatch(postVideoGame(postfinal));
    setInput({
      name: '',
      description: '',
      released: '',
      rating: '',
      genres: [],
      platforms: [],
    });
    alert('Videojuego creado correctamente');
  }

  function handleDeletePlatoformas(e){
    setInput({
        ...input,
         platforms:input.platforms.filter(t=>t !== e)
    })
}
function handleDeleteGeneros(e){
  setInput({
    ...input,
     genres:input.genres.filter(t=>t !== e)//manejador del boton X de temperament
})
}
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  return (
    <div>
      <Link to='/home'>
        <button>Volver</button>
      </Link>
      <h2>Crea tu Videojuego!</h2>
      <form onSubmit={e => handlerSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type='text'
            value={input.name}
            name='name'
            required
            placeholder='Ej : call of dutty'
            onChange={e => handlerChange(e)}
          />
          {errors.name ? <p>{errors.name}</p> : null}
        </div>
        <div>
          <label>Descripción</label>
          <input
            type='text'
            value={input.description}
            name='description'
            required
            placeholder='Ej: este es juego se trata...'
            onChange={e => handlerChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Fecha de lanzamiento</label>
          <input
            type='Date'
            value={input.released}
            name='released'
            onChange={e => handlerChange(e)}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type='Number'
            value={input.rating}
            name='rating'
            min={1}
            max={5}
            placeholder={'1-5'}
            onChange={e => handlerChange(e)}
          />
        </div>
        <div>
          <h3>Generos :</h3>
          <select name='Genros' onChange={e => handlerCkeckGenros(e)}>
            {generos.map(g => {
              return (
                <option value={g.name} key={g.id}>
                  {g.name}
                </option>
              );
            })}
           
          </select>
           
          {input.genres.map((el, index) => (
            <div className='divTem' key={index + 1}>
              <p>{el}</p>
              <button className='botonX' type='button' onClick={() => handleDeleteGeneros(el)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3>Plataformas </h3>
          <select name='Platafromas' onChange={e => handlerCkeckPlataformas(e)}>
            {platforms.map((g, index) => {
              return (
                <option value={g} key={index + 1}>
                  {g}
                </option>
              );
            })}
          </select>
          {input.platforms.map((el, index) => (
            <div className='divTem' key={index + 1}>
              <p>{el}</p>
              <button className='botonX' type='button' onClick={() => handleDeletePlatoformas(el)}>
                X
              </button>
            </div>
          ))}
        </div>
        <button type='submit'>Crear VideoGames</button>
      </form>
    </div>
  );
};

export default Formulario;

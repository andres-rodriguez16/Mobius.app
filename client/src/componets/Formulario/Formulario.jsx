import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideoGame, getGenres } from '../../redux/actions/action';
import platforms from './Plataformas';
import s from './Formulario.module.css';
const validarNombre = {
  name: /^[A-Z0-9a-zÑñÁáÉéÍíÓóÚúÜü:\s]+$/,
};

function validation(input) {
  const errores = {};
  if (!input.name) {
    errores.name = 'no escribiste el nombre';
  } else if (!validarNombre.name.test(input.name)) {
    errores.name = 'El nombre es incorrecto';
  }
  if (!input.description) {
    errores.description = 'Este campo no puede estar vacio';
  } else if (input.description.length <= 200) {
    errores.description =
      'este campo no cumple, con el tamaño suficiente para agregar description';
  }
  if (input.genres.length === 0) {
    errores.genres = 'Este campo no puede estar vacio';
  }
  if (input.platforms.length === 0) {
    errores.platforms = 'Este campo no puede estar vacio';
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
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    }
    setErrors(
      validation({
        ...input,
        genres: [...input.platforms, e.target.value],
      })
    );
  }

  function handlerCkeckPlataformas(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    } else {
      setInput({
        ...input,
      });
    }

    setErrors(
      validation({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    );
  }

  function handlerSubmit(e) {
    e.preventDefault();
    let encotrarID = generos.filter(g => input.genres.includes(g.name));
    encotrarID = encotrarID.map(t => t.id);
    if (errors.name || errors.description) {
      return alert('complete los input correctamente');
    }
    if (!input.genres.length) {
      return alert('tiene que agregar generos');
    }
    if (!input.platforms.length) {
      return alert('tiene que agregar plataformas');
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

  function handleDeletePlatoformas(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter(t => t !== e),
    });
  }
  function handleDeleteGeneros(e) {
    setInput({
      ...input,
      genres: input.genres.filter(t => t !== e), //manejador del boton X de temperament
    });
  }
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <h2 className={s.h1__create}>Crea tu Videojuego!</h2>
      <div className={s.container}>
        <form onSubmit={e => handlerSubmit(e)}>
          <div className={s.input__all}>
            <div className={s.input}>
              <h4>Nombre</h4>
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
            <div className={s.input}>
              <h4>Descripción</h4>
              <textarea
                className={s.textarea}
                type='text'
                value={input.description}
                name='description'
                required
                placeholder='Ej: este es juego se trata...'
                onChange={e => handlerChange(e)}
                rows='5'
                cols='50'
              ></textarea>
              {errors.description && <p>{errors.description}</p>}
            </div>
            <div className={s.input}>
              <h4>Fecha de lanzamiento</h4>
              <input
                type='Date'
                value={input.released}
                name='released'
                onChange={e => handlerChange(e)}
              />
            </div>
            <div className={s.input}>
              <h4>Rating</h4>
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
            {errors.rating && <p>{errors.rating}</p>}
            <div className={s.select}>
              <div>
                <h3> Generos :</h3>
                <select className={s.select__Pla__ge} name='Genros' onChange={e => handlerCkeckGenros(e)}>
                  <option value='generos'>Select</option>
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
                    <button
                      className={s.put__off}
                      type='button'
                      onClick={() => handleDeleteGeneros(el)}
                    >
                      <span>{el}</span>
                    </button>
                  </div>
                ))}
              </div>
              {errors.genres ? <p>{errors.genres}</p> : null}
              <div className={s.select}>
                <h3> Plataformas :</h3>
                <select
                className={s.select__Pla__ge} 
                  name='Platafromas'
                  onChange={e => handlerCkeckPlataformas(e)}
                >
                  <option value='plataformas'>Select</option>
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
                    <button
                      className={s.put__off}
                      type='button'
                      onClick={() => handleDeletePlatoformas(el)}
                    >
                      <span>{el}</span>
                    </button>
                  </div>
                ))}
              </div>
              {errors.platforms ? <p>{errors.platforms}</p> : null}
            </div>
          </div>
          <button type='submit' className={s.button__submit}>Crear</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;

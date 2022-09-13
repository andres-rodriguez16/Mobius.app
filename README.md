

# Individual Project - Möbius

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Agregar nuevos videojuegos


#### Tecnologías utilizadas

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Vista del proyecto

 1. Forkear el repositorio para tener una copia del mismo en sus cuentas
 2. Clonar el repositorio en sus computadoras para poder ver el proyecto 
 
Recuerda estar posicionado sobre la carpeta del proyecto, en este caso debe terminar en /Mobius
- Hacer `npm install` en la terminal. Esto nos va a descargar todos los paquetes necesarios para nuestra aplicación.
- Hacer `npm start`. en `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.
  Esto nos llevará al navegador donde podremos ver la aplicación.

## Landing page

Así luce la página de inicio.

![Port](https://raw.githubusercontent.com/andresyrg16/Mobius.app/front/details/client/public/img/landingPAge.png)

Para poder entrar al proyecto tenemos dos opciones, la primera es usarlo desde el deploy y la segunda es usarlo de manera local en tu compu.
**Nota:** para una mejor experiencia recomiendo verlo desde un computador ya que no es responsive.

## Home

![Port](https://raw.githubusercontent.com/andresyrg16/Mobius.app/front/details/client/public/img/home.png)

Área donde se verá el listado de videojuegos:
- card con Imagen, Nombre, Géneros, Fecha
- Barra para Buscar videjuegos
- Filtros diferentes tipos de orden como fecha, ranting, etc.
- Paginado numerico

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const videogame = require("./models/Videogame")
const Generos = require("./models/Generos")
const {
  DB_USER, DB_PASSWORD, DB_HOST, PGDATABASE, PGHOST, PGPORT, PGUSER, PGPASSWORD
} = process.env;

const sequelize =
process.env.NODE_ENV === "production"
? new Sequelize({
    database: PGDATABASE,
    dialect: "postgres",
    host: PGHOST,
    port: PGPORT,
    username: PGUSER,
    password: PGPASSWORD,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })
    :
    new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
      logging: false,
      native: false,
    });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
videogame(sequelize)
Generos(sequelize)
const { Videogame, Genero } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Movie.belongsToMany(Actor, { through: 'ActorMovies' });
// Actor.belongsToMany(Movie, { through: 'ActorMovies' });

Videogame.belongsToMany(Genero, { through: "VideogameGenero" })
Genero.belongsToMany(Videogame, { through: "VideogameGenero" })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  DB: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

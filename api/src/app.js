const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const videogames = require("./routes/rutaPorGames")
const videogame = require("./routes/rutaPorId")
const genres = require("./routes/genres")
require('./db.js');

const server = express();

server.name = 'API';

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "https://mobius-app-client-cxqx-qdrn9vv6b-andresyrg16.vercel.app/"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/videogames", videogames);
server.use("/videogame", videogame);
server.use("/genres", genres);
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
}); 

module.exports = server;

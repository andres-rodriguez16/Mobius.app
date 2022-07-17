const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción: {
      type: DataTypes.TEXT
    },
    Rating :{
     type : DataTypes.INTEGER
    },
    Plataformas :{
      type : DataTypes.STRING
    }
  });
};


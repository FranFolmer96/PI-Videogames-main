const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//// modelo de plataforma////


module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('platform', {

      name: {
         type: DataTypes.STRING,
         allowNull: false
      }
   }, {
      timestamps: false
   })
};
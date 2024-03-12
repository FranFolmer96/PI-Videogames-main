const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//// modelo de genero////

module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('gender', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         // defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: {
         type: DataTypes.ENUM(
            "Action", "Indie", "Adventure",
             "RPG", "Strategy", "Shooter",
              "Casual", "Simulation", "Puzzle",
               "Arcade", "Platformer", "Racing",
                "Massively Multiplayer", "Sports",
                 "Fighting", "Family", "Board Games",
                  "Educational", "Card",
         ),
         allowNull: false
      }
   }, {
      timestamps: false
   })
};
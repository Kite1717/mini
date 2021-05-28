'use strict';

module.exports = (sequelize, DataTypes) => {

  const Book = sequelize.define('Book', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      bookName: {
        type: DataTypes.STRING,
      },

  }, {
    tableName: "books",
    paranoid: false,
    timestamps: false,
  });


  return Book;
};
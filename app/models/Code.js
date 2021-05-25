"use strict";

module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define(
    "Code",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bookRegistrationCode: {
        type: DataTypes.STRING,
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: { model: 'books', key: 'id' }
      },
    },
    {
      tableName: "codes",
      paranoid: false,
      timestamps: false,
    }
  );


  Code.associate = (models) => {
    Code.belongsTo(models.Book, {
      foreignKey: {
        name: "bookId",
        allowNull: false,
      },
      as: "books",
    });
  };

  return Code;
};

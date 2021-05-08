'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    username:{
      allowNull: false,
      type: DataTypes.STRING
    },

  }, {
    tableName: "users",
    paranoid: false,
    timestamps: false,
  });


  return User;
};
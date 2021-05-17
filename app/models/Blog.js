'use strict';

module.exports = (sequelize, DataTypes) => {

  const Blog = sequelize.define('Blog', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      title: {
        type: DataTypes.STRING,
      },
      des: {
        type: DataTypes.STRING,
      },

  }, {
    tableName: "blogs",
    paranoid: false,
    timestamps: false,
  });


  return Blog;
};
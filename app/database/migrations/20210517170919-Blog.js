'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        type: Sequelize.STRING,
      },
      des: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};

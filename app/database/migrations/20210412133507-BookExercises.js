'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('bookexercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' }

      },
      exerciseImg: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      exerciseOrderNo: {
        type: Sequelize.INTEGER,
      },
      exerciseAttainmentName: {
        type: Sequelize.STRING,
      },
      exerciseAttainmentDes: {
        type: Sequelize.STRING,
      },
      contScore: {
        type: Sequelize.REAL,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};

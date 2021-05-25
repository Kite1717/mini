'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookRegistrationCode: {
        type: Sequelize.STRING,
       
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
       defaultValue : false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};

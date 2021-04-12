'use strict';

const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('users', [{
        fullName: 'CODE 35',
        email: 'bilgi@code35.net',
        phoneNumber : '',
        role: 0,
        tcNo : "22222222222",
        deviceIdNo : '3333333333',
        password: bcrypt.hashSync('260620', +authConfig.rounds),
        createdAt: new Date(),
        updatedAt: new Date(),
        isTipAdmin:true,

      }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('users', null, {});
     
  }
};

'use strict';

const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'administrador',
      email: 'administrador@gmail.com',
      group: 'administrador',
      password: bcryptjs.hashSync("administrador"),
      createdAt: new Date(),
      updatedAt: new Date() 
    },
    {
      name: 'normaluser',
      email: 'normaluser@gmail.com',
      group: 'normaluser',
      password: bcryptjs.hashSync("normaluser"),
      createdAt: new Date(),
      updatedAt: new Date() 
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

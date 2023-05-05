'use strict';
/** @type {import('sequelize-cli').Migration} */
require("dotenv").config()
const env = process.env.NODE_ENV || 'development';
const config = require("./../config/storage")[env];
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [{
      url: env == "development" 
      ?  config.ssl 
        ? "https://" + config.host + ":" + config.port + "/images/" + "null-user.jpg" 
        : "http://" + config.host + ":" + config.port + "/images/" + "null-user.jpg"
      : config.nullUserUrl,
      for: "null-user",
      createdAt: new Date(),
      updatedAt: new Date() 
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};

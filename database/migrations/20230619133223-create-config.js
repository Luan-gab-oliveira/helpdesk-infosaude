'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('config', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      config:{
        type: Sequelize.STRING,
      },
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('config');
  }
};

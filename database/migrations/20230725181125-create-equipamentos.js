'use strict';

const { NUMBER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('equipamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      equipamento:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      patrimonio:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      unidade:{
        type: Sequelize.STRING,
        allowNull:true,
      },
      local:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('equipamentos');
  }
};

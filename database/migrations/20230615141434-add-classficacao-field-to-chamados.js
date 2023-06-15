'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'chamados',
      'classificacao',
      {
        type: Sequelize.STRING,
        after:'status'
      },
    ); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'chamados',
      'classificacao',
      );
  }
};

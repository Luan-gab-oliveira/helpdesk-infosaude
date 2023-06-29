'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'chamados',
      'atendimento',
      {
        type: Sequelize.STRING,
        defaultValue: 'local',
        allowNull: false,
        after:'status'
      },
    ); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'chamados',
      'atendimento',
      );
  }
};

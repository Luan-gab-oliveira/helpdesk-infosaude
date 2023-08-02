'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'usuarios',
      'categoria',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        after: 'acesso'
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'usuarios',
      'categoria',
    );
  }
};

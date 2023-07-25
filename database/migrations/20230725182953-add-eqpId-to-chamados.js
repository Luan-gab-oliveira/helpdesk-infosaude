'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'chamados',
      'eqp_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'equipamentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'user_id'
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'chamados',
      'eqp_id',
    );
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'log_emails',
      'text',
      {
        type: Sequelize.STRING(16777215),
        allowNull: false
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'log_emails',
      'text',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    );
  }
};
